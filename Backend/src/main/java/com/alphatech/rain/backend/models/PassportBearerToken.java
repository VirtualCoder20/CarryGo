package com.alphatech.rain.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "passport_bearer_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PassportBearerToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "access_token", columnDefinition = "TEXT")
    private String accessToken;

    @Column(name = "token_type")
    private String tokenType;

    @Column(name = "expires_in")
    private Integer expiresIn;

    @Column(name = "scope")
    private String scope;

    @Column(name = "merchant_code")
    private String merchantCode;

    @Column(name = "production_payment_code")
    private String productionPaymentCode;

    @Column(name = "requestor_id")
    private String requestorId;

    @Column(name = "payable_id")
    private String payableId;

    @Column(name = "jti")
    private String jti;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "client_id")
    private String clientId;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (expiresIn != null) {
            expiresAt = createdAt.plusSeconds(expiresIn);
        }
    }
}