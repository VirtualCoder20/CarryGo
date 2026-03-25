package com.alphatech.rain.backend.controller;

import com.alphatech.rain.backend.dto.request.IdentityVerificationRequestDTO;
import com.alphatech.rain.backend.dto.request.ProfileUpdateRequestDTO;
import com.alphatech.rain.backend.dto.request.RoleUpdateRequestDTO;
import com.alphatech.rain.backend.dto.response.OnboardingStatusResponseDTO;
import com.alphatech.rain.backend.models.User;
import com.alphatech.rain.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * PATCH /api/v1/user/role
     * Assign a role to the authenticated user.
     */
    @PatchMapping("/role")
    public ResponseEntity<OnboardingStatusResponseDTO> updateRole(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody RoleUpdateRequestDTO request) {

        return ResponseEntity.ok(userService.updateRole(currentUser, request));
    }

    /**
     * PATCH /api/v1/user/profile
     * Update basic profile information (multipart/form-data).
     */
    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OnboardingStatusResponseDTO> updateProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @ModelAttribute ProfileUpdateRequestDTO request) {

        return ResponseEntity.ok(userService.updateProfile(currentUser, request));
    }

    /**
     * POST /api/v1/user/verify-identity
     * Upload identity documents for verification.
     */
    @PostMapping(value = "/verify-identity", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OnboardingStatusResponseDTO> verifyIdentity(
            @AuthenticationPrincipal User currentUser,
            @ModelAttribute IdentityVerificationRequestDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.verifyIdentity(currentUser, request));
    }
}