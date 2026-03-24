package com.alphatech.rain.backend.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class IdentityVerificationRequestDTO {

    // Shared
    private MultipartFile nationalID;

    // Driver-only
    private MultipartFile driversLicense;
    private MultipartFile vehicleRegistration;
    private MultipartFile proofOfInsurance;
    private String vehicleDescription;

    // Commuter-only
    private MultipartFile billPayment;
}
