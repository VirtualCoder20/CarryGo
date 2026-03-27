package com.alphatech.rain.backend.service;

import com.alphatech.rain.backend.dto.request.IdentityVerificationRequestDTO;
import com.alphatech.rain.backend.dto.request.ProfileUpdateRequestDTO;
import com.alphatech.rain.backend.dto.request.RoleUpdateRequestDTO;
import com.alphatech.rain.backend.dto.response.OnboardingStatusResponseDTO;
import com.alphatech.rain.backend.models.User;

public interface UserService {
    OnboardingStatusResponseDTO updateRole(User currentUser, RoleUpdateRequestDTO request);
    OnboardingStatusResponseDTO updateProfile(User currentUser, ProfileUpdateRequestDTO request);
    OnboardingStatusResponseDTO verifyIdentity(User currentUser, IdentityVerificationRequestDTO request);
}
