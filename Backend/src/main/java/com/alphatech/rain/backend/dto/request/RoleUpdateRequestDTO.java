package com.alphatech.rain.backend.dto.request;

import com.alphatech.rain.backend.models.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RoleUpdateRequestDTO {

    @NotNull(message = "Role is required")
    private Role role;
}
