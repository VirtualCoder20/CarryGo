package com.alphatech.rain.backend.models;

import com.alphatech.rain.backend.models.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "identity_verifications")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdentityVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus;

    // Driver documents
    @Column(name = "drivers_license_url")
    private String driversLicenseUrl;

    @Column(name = "vehicle_registration_url")
    private String vehicleRegistrationUrl;

    @Column(name = "national_id_url")
    private String nationalIdUrl;

    @Column(name = "proof_of_insurance_url")
    private String proofOfInsuranceUrl;

    @Column(name = "vehicle_description")
    private String vehicleDescription;

    // Commuter documents
    @Column(name = "bill_payment_url")
    private String billPaymentUrl;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
