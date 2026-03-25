package com.alphatech.rain.backend.service;
import com.alphatech.rain.backend.dto.request.SendOtpRequestDTO;
import com.alphatech.rain.backend.dto.response.SendOtpResponseDTO;
public interface QuickTellerOTPSendService {
    SendOtpResponseDTO sendOtp(SendOtpRequestDTO request);
}