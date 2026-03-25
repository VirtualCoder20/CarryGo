package com.alphatech.rain.backend.service.impl;

import com.alphatech.rain.backend.dto.request.PhoneRequestDTO;
import com.alphatech.rain.backend.dto.request.VerifyOtpRequestDTO;
import com.alphatech.rain.backend.dto.response.AuthResponseDTO;
import com.alphatech.rain.backend.dto.response.GenericResponseDTO;
import com.alphatech.rain.backend.exception.InvalidOtpException;
import com.alphatech.rain.backend.utils.UserMapper;
import com.alphatech.rain.backend.models.Otp;
import com.alphatech.rain.backend.models.User;
import com.alphatech.rain.backend.models.enums.OnboardingStatus;
import com.alphatech.rain.backend.repository.OtpRepository;
import com.alphatech.rain.backend.repository.UserRepository;
import com.alphatech.rain.backend.security.JwtUtil;
import com.alphatech.rain.backend.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Value("${app.otp.expiry-minutes:5}")
    private int otpExpiryMinutes;

    @Value("${app.otp.length:4}")
    private int otpLength;

    @Override
    @Transactional
    public GenericResponseDTO sendOtp(PhoneRequestDTO request) {
        // Invalidate any existing OTPs for this phone
        otpRepository.deleteAllByPhone(request.getPhone());

        String code = generateOtp();
        Otp otp = Otp.builder()
                .phone(request.getPhone())
                .code(code)
                .expiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes))
                .verified(false)
                .build();

        otpRepository.save(otp);

        // In production, integrate an SMS provider (e.g. Twilio, Termii) here.
        log.info("OTP for {} → {} (expires in {} min)", request.getPhone(), code, otpExpiryMinutes);

        //send OTP Using QuickTeller API

        // End of SendOTP Using QuickTeller API

        return GenericResponseDTO.builder().message("OTP sent successfully").build();
    }

    @Override
    @Transactional
    public AuthResponseDTO verifyOtp(VerifyOtpRequestDTO request) {
        Otp otp = otpRepository
                .findTopByPhoneAndVerifiedFalseOrderByIdDesc(request.getPhone())
                .orElseThrow(() -> new InvalidOtpException("No pending OTP found for this phone number"));

        if (LocalDateTime.now().isAfter(otp.getExpiryTime())) {
            throw new InvalidOtpException("OTP has expired. Please request a new one.");
        }

        if (!otp.getCode().equals(request.getOtp())) {
            throw new InvalidOtpException("Invalid OTP. Please try again.");
        }

        // Mark OTP as used
        otp.setVerified(true);
        otpRepository.save(otp);

        // Find or create user
        User user = userRepository.findByPhone(request.getPhone())
                .orElseGet(() -> createNewUser(request.getPhone()));

        String token = jwtUtil.generateToken(user.getId());

        return AuthResponseDTO.builder()
                .token(token)
                .user(userMapper.toUserResponseDTO(user))
                .build();
    }

    private User createNewUser(String phone) {
        User newUser = User.builder()
                .phone(phone)
                .onboardingStatus(OnboardingStatus.ROLE_SELECTION)
                .build();
        return userRepository.save(newUser);
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int max = (int) Math.pow(10, otpLength);
        int min = (int) Math.pow(10, otpLength - 1);
        return String.valueOf(min + random.nextInt(max - min));
    }
}
