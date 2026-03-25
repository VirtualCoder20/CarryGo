package com.alphatech.rain.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendOtpResponseDTO {

    @JsonProperty("success")
    private Boolean success;

    @JsonProperty("code")
    private String code;

    @JsonProperty("message")
    private String message;

    @JsonProperty("data")
    private List<OtpDataDTO> data;

    // For error response
    @JsonProperty("responseCode")
    private String responseCode;

    @JsonProperty("errors")
    private List<List<String>> errors;

    @JsonProperty("logId")
    private String logId;

    public boolean isSuccess() {
        return success != null && success;
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class OtpDataDTO {

    @JsonProperty("message")
    private String message;

    @JsonProperty("messageId")
    private String messageId;

    @JsonProperty("timestamp")
    private String timestamp;
}