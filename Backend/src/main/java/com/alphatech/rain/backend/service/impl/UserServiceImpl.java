package com.alphatech.rain.backend.service.impl;

import com.alphatech.rain.backend.dto.request.IdentityVerificationRequestDTO;
import com.alphatech.rain.backend.dto.request.ProfileUpdateRequestDTO;
import com.alphatech.rain.backend.dto.request.RoleUpdateRequestDTO;
import com.alphatech.rain.backend.dto.response.OnboardingStatusResponseDTO;
import com.alphatech.rain.backend.exception.BadRequestException;
import com.alphatech.rain.backend.models.IdentityVerification;
import com.alphatech.rain.backend.models.User;
import com.alphatech.rain.backend.models.enums.OnboardingStatus;
import com.alphatech.rain.backend.models.enums.Role;
import com.alphatech.rain.backend.models.enums.VerificationStatus;
import com.alphatech.rain.backend.repository.IdentityVerificationRepository;
import com.alphatech.rain.backend.repository.UserRepository;
import com.alphatech.rain.backend.service.UserService;
import com.alphatech.rain.backend.utils.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final IdentityVerificationRepository identityVerificationRepository;
    private final FileStorageService fileStorageService;

    @Override
    @Transactional
    public OnboardingStatusResponseDTO updateRole(User currentUser, RoleUpdateRequestDTO request) {
        currentUser.setRole(request.getRole());
        currentUser.setOnboardingStatus(OnboardingStatus.PROFILE_INFO);
        userRepository.save(currentUser);

        log.info("User {} assigned role {}", currentUser.getId(), request.getRole());

        return OnboardingStatusResponseDTO.builder()
                .onboardingStatus(OnboardingStatus.PROFILE_INFO)
                .build();
    }

    @Override
    @Transactional
    public OnboardingStatusResponseDTO updateProfile(User currentUser, ProfileUpdateRequestDTO request) {
        // Validate email uniqueness (excluding current user)
        userRepository.findByPhone(currentUser.getPhone()).ifPresent(existing -> {
            if (request.getEmail() != null &&
                !request.getEmail().equalsIgnoreCase(existing.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
                throw new BadRequestException("Email address is already in use");
            }
        });

        currentUser.setFullName(request.getFullName());
        currentUser.setEmail(request.getEmail());
        currentUser.setHomeLocation(request.getHomeLocation());
        currentUser.setWorkLocation(request.getWorkLocation());

        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            String avatarUrl = fileStorageService.store(request.getAvatar(), "avatars");
            currentUser.setAvatarUrl(avatarUrl);
        }

        currentUser.setOnboardingStatus(OnboardingStatus.IDENTITY_VERIFICATION);
        userRepository.save(currentUser);

        log.info("Profile updated for user {}", currentUser.getId());

        return OnboardingStatusResponseDTO.builder()
                .onboardingStatus(OnboardingStatus.IDENTITY_VERIFICATION)
                .build();
    }

    @Override
    @Transactional
    public OnboardingStatusResponseDTO verifyIdentity(User currentUser, IdentityVerificationRequestDTO request) {
        if (currentUser.getRole() == null) {
            throw new BadRequestException("User role must be assigned before identity verification");
        }

        String subfolder = "identity/" + currentUser.getId();
        IdentityVerification.IdentityVerificationBuilder builder = IdentityVerification.builder()
                .user(currentUser)
                .verificationStatus(VerificationStatus.PENDING);

        if (currentUser.getRole() == Role.DRIVER) {
            validateDriverDocuments(request);
            builder
                    .driversLicenseUrl(fileStorageService.store(request.getDriversLicense(), subfolder))
                    .vehicleRegistrationUrl(fileStorageService.store(request.getVehicleRegistration(), subfolder))
                    .nationalIdUrl(fileStorageService.store(request.getNationalID(), subfolder))
                    .proofOfInsuranceUrl(fileStorageService.store(request.getProofOfInsurance(), subfolder))
                    .vehicleDescription(request.getVehicleDescription());
        } else {
            validateCommuterDocuments(request);
            builder
                    .nationalIdUrl(fileStorageService.store(request.getNationalID(), subfolder))
                    .billPaymentUrl(fileStorageService.store(request.getBillPayment(), subfolder));
        }

        // Remove any previous submission
        identityVerificationRepository.findByUserId(currentUser.getId())
                .ifPresent(identityVerificationRepository::delete);

        identityVerificationRepository.save(builder.build());

        currentUser.setOnboardingStatus(OnboardingStatus.COMPLETE);
        userRepository.save(currentUser);

        log.info("Identity verification submitted for user {}", currentUser.getId());

        return OnboardingStatusResponseDTO.builder()
                .verificationStatus(VerificationStatus.PENDING)
                .onboardingStatus(OnboardingStatus.COMPLETE)
                .build();
    }

    private void validateDriverDocuments(IdentityVerificationRequestDTO req) {
        if (req.getDriversLicense() == null || req.getDriversLicense().isEmpty())
            throw new BadRequestException("Driver's license is required for drivers");
        if (req.getVehicleRegistration() == null || req.getVehicleRegistration().isEmpty())
            throw new BadRequestException("Vehicle registration is required for drivers");
        if (req.getNationalID() == null || req.getNationalID().isEmpty())
            throw new BadRequestException("National ID is required");
        if (req.getProofOfInsurance() == null || req.getProofOfInsurance().isEmpty())
            throw new BadRequestException("Proof of insurance is required for drivers");
        if (req.getVehicleDescription() == null || req.getVehicleDescription().isBlank())
            throw new BadRequestException("Vehicle description is required for drivers");
    }

    private void validateCommuterDocuments(IdentityVerificationRequestDTO req) {
        if (req.getNationalID() == null || req.getNationalID().isEmpty())
            throw new BadRequestException("National ID is required");
        if (req.getBillPayment() == null || req.getBillPayment().isEmpty())
            throw new BadRequestException("Bill payment document is required for commuters");
    }
}