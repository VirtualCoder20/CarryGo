package com.alphatech.rain.backend.dto.response;

import com.alphatech.rain.backend.models.enums.OnboardingStatus;
import com.alphatech.rain.backend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String id;
    private String phone;
    private Role role;
    private OnboardingStatus onboardingStatus;
    private String fullName;
    private String email;
    private String homeLocation;
    private String workLocation;
    private String avatarUrl;
}
