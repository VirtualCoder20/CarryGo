package com.alphatech.rain.backend.controller;

import com.alphatech.rain.backend.dto.request.PhoneRequestDTO;
import com.alphatech.rain.backend.dto.request.VerifyOtpRequestDTO;
import com.alphatech.rain.backend.dto.response.AuthResponseDTO;
import com.alphatech.rain.backend.dto.response.GenericResponseDTO;
import com.alphatech.rain.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/v1/auth/phone
     * Initiate phone verification by sending an OTP.
     */
    @PostMapping("/phone")
    public ResponseEntity<GenericResponseDTO> sendOtp(@Valid @RequestBody PhoneRequestDTO request) {
        return ResponseEntity.ok(authService.sendOtp(request));
    }

    /**
     * POST /api/v1/auth/verify
     * Verify OTP and complete login/signup.
     */
    @PostMapping("/verify")
    public ResponseEntity<AuthResponseDTO> verifyOtp(@Valid @RequestBody VerifyOtpRequestDTO request) {
        return ResponseEntity.ok(authService.verifyOtp(request));
    }
}