package com.alphatech.rain.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendOtpRequestDTO {

    @NotBlank(message = "phoneNumber is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "invalid mobile phone format")
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @NotBlank(message = "code is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "code must be 6 digits")
    @JsonProperty("code")
    private String code;

    @NotBlank(message = "action is required")
    @JsonProperty("action")
    private String action;

    @NotBlank(message = "service is required")
    @JsonProperty("service")
    private String service;

    @NotBlank(message = "channel is required")
    @JsonProperty("channel")
    private String channel;
}