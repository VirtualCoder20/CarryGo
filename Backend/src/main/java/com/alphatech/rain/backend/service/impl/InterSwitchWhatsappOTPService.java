package com.alphatech.rain.backend.service.impl;

import com.alphatech.rain.backend.dto.request.SendOtpRequestDTO;
import com.alphatech.rain.backend.dto.response.SendOtpResponseDTO;
import com.alphatech.rain.backend.exception.OtpServiceException;
import com.alphatech.rain.backend.service.QuickTellerOTPSendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
@Slf4j
public class InterSwitchWhatsappOTPService implements QuickTellerOTPSendService {
    @Value("${QUICKTELLER.Whatsapp_token_send_url}")
    private String tokenSendUrl;
    private final RestTemplate restTemplate;
    private final PassportBearerTokenService tokenService;

    @Override
    public SendOtpResponseDTO sendOtp(SendOtpRequestDTO request) {
        log.info("Sending OTP to phone number: {} for service: {}",
                maskPhoneNumber(request.getPhoneNumber()), request.getService());

        try {
            // Get bearer token (non-blocking)
            String bearerToken = tokenService.getBearerToken();

            // Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(bearerToken);

            // Prepare request entity
            HttpEntity<SendOtpRequestDTO> requestEntity = new HttpEntity<>(request, headers);

            // Make API call
            ResponseEntity<SendOtpResponseDTO> response = restTemplate.exchange(
                    tokenSendUrl,
                    HttpMethod.POST,
                    requestEntity,
                    SendOtpResponseDTO.class
            );

            // Process response
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                SendOtpResponseDTO responseBody = response.getBody();

                if (responseBody.isSuccess()) {
                    log.info("OTP sent successfully to {}: {}",
                            maskPhoneNumber(request.getPhoneNumber()),
                            responseBody.getMessage());
                } else {
                    log.warn("OTP sending failed: {}", responseBody.getMessage());
                }

                return responseBody;
            } else {
                throw new OtpServiceException("Unexpected response status: " + response.getStatusCode());
            }

        } catch (RestClientException e) {
            log.error("Error calling OTP service: {}", e.getMessage(), e);
            throw new OtpServiceException("Failed to send OTP", e);
        }
    }

    private String maskPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.length() < 8) {
            return "***";
        }
        return phoneNumber.substring(0, 4) + "****" +
               phoneNumber.substring(phoneNumber.length() - 3);
    }
}
