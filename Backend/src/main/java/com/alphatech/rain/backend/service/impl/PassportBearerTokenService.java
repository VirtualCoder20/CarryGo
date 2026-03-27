package com.alphatech.rain.backend.service.impl;

import com.alphatech.rain.backend.dto.response.BearerTokenResponseDTO;
import com.alphatech.rain.backend.models.PassportBearerToken;
import com.alphatech.rain.backend.repository.BearerTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassportBearerTokenService {
    //import variables
    @Value("${QUICKTELLER.CLIENTID}")
    private String clientId;
    @Value("${QUICKTELLER.SECRET}")
    private String secret;
    @Value("${QUICKTELLER.TokenUrl}")
    private String tokenUrl;

    private final BearerTokenRepository bearerTokenRepository;
    private final RestTemplate restTemplate;

    /**
     * Get bearer token - from database if valid, otherwise request new one
     */
    @Transactional
    public String getBearerToken() {
        log.info("Fetching bearer token for client: {}", clientId);

        // Check if we have a valid token in database
        PassportBearerToken existingToken = bearerTokenRepository
                .findTopByClientIdOrderByCreatedAtDesc(clientId)
                .orElse(null);

        if (existingToken != null && !isTokenExpired(existingToken)) {
            log.info("Using existing valid token from database");
            return existingToken.getAccessToken();
        }

        // Request new token
        log.info("Requesting new bearer token from Passport");
        BearerTokenResponseDTO newTokenResponse = requestNewToken();

        // Save new token to database
        PassportBearerToken newToken = saveTokenToDatabase(newTokenResponse);

        return newToken.getAccessToken();
    }

    /**
     * Request new token from Passport endpoint
     */
    private BearerTokenResponseDTO requestNewToken() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            // Create Basic Auth header
            String auth = clientId + ":" + secret;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
            headers.set("Authorization", "Basic " + encodedAuth);

            // Request body
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "client_credentials");

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<BearerTokenResponseDTO> response = restTemplate.exchange(
                    tokenUrl + "?grant_type=client_credentials",
                    HttpMethod.POST,
                    requestEntity,
                    BearerTokenResponseDTO.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                log.info("Successfully obtained new bearer token");
                return response.getBody();
            } else {
                throw new RuntimeException("Failed to obtain bearer token. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("Error requesting bearer token: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to obtain bearer token", e);
        }
    }

    /**
     * Save token response to database
     */
    private PassportBearerToken saveTokenToDatabase(BearerTokenResponseDTO tokenResponse) {
        // Delete any existing tokens for this client (optional - based on your requirements)
        bearerTokenRepository.deleteByClientId(clientId);

        PassportBearerToken token = new PassportBearerToken();
        token.setAccessToken(tokenResponse.getAccessToken());
        token.setTokenType(tokenResponse.getTokenType());
        token.setExpiresIn(tokenResponse.getExpiresIn());
        token.setScope(tokenResponse.getScope());
        token.setMerchantCode(tokenResponse.getMerchantCode());
        token.setProductionPaymentCode(tokenResponse.getProductionPaymentCode());
        token.setRequestorId(tokenResponse.getRequestorId());
        token.setPayableId(tokenResponse.getPayableId());
        token.setJti(tokenResponse.getJti());
        token.setClientId(clientId);

        // expiresAt will be set automatically by @PrePersist

        return bearerTokenRepository.save(token);
    }

    /**
     * Check if token is expired or about to expire (with 5-minute buffer)
     */
    private boolean isTokenExpired(PassportBearerToken token) {
        if (token.getExpiresAt() == null) {
            return true;
        }
        // Add 5-minute buffer to consider token as expired before actual expiry
        LocalDateTime bufferTime = LocalDateTime.now().plusMinutes(5);
        return token.getExpiresAt().isBefore(bufferTime);
    }

    /**
     * Force refresh token (ignore existing database token)
     */
    @Transactional
    public String refreshBearerToken() {
        log.info("Force refreshing bearer token");
        BearerTokenResponseDTO newTokenResponse = requestNewToken();
        PassportBearerToken newToken = saveTokenToDatabase(newTokenResponse);
        return newToken.getAccessToken();
    }

    /**
     * Get token with validation - returns null if token is invalid/expired
     */
    @Transactional(readOnly = true)
    public String getValidBearerTokenOrNull() {
        PassportBearerToken token = bearerTokenRepository
                .findTopByClientIdOrderByCreatedAtDesc(clientId)
                .orElse(null);

        if (token != null && !isTokenExpired(token)) {
            return token.getAccessToken();
        }

        return null;
    }

    /**
     * Check if current token is valid
     */
    public boolean isCurrentTokenValid() {
        PassportBearerToken token = bearerTokenRepository
                .findTopByClientIdOrderByCreatedAtDesc(clientId)
                .orElse(null);

        return token != null && !isTokenExpired(token);
    }

}
