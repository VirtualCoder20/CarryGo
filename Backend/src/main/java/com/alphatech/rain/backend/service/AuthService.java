package com.alphatech.rain.backend.service;

import com.alphatech.rain.backend.dto.request.PhoneRequestDTO;
import com.alphatech.rain.backend.dto.request.VerifyOtpRequestDTO;
import com.alphatech.rain.backend.dto.response.AuthResponseDTO;
import com.alphatech.rain.backend.dto.response.GenericResponseDTO;

public interface AuthService {
    GenericResponseDTO sendOtp(PhoneRequestDTO request);
    AuthResponseDTO verifyOtp(VerifyOtpRequestDTO request);
}
