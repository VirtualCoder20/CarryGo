package com.alphatech.rain.backend.repository;

import com.alphatech.rain.backend.models.Otp;
import com.alphatech.rain.backend.models.PassportBearerToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface BearerTokenRepository extends JpaRepository<PassportBearerToken, Long> {
    Optional<PassportBearerToken> findTopByClientIdOrderByCreatedAtDesc(String clientId);
    Optional<PassportBearerToken> findByClientIdAndAccessToken(String clientId, String accessToken);
    void deleteByClientId(String clientId);
}
