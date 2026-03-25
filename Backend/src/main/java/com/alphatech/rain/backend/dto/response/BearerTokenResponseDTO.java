package com.alphatech.rain.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BearerTokenResponseDTO {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType;

    @JsonProperty("expires_in")
    private Integer expiresIn;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("merchant_code")
    private String merchantCode;

    @JsonProperty("production_payment_code")
    private String productionPaymentCode;

    @JsonProperty("requestor_id")
    private String requestorId;

    @JsonProperty("payable_id")
    private String payableId;

    @JsonProperty("jti")
    private String jti;
}
