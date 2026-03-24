package com.alphatech.rain.backend.dto.response;


import com.alphatech.rain.backend.models.enums.OnboardingStatus;
import com.alphatech.rain.backend.models.enums.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OnboardingStatusResponseDTO {
    private OnboardingStatus onboardingStatus;
    private VerificationStatus verificationStatus;
}
