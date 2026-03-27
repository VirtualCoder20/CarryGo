package com.alphatech.rain.backend.utils;


import com.alphatech.rain.backend.dto.response.UserResponseDTO;
import com.alphatech.rain.backend.models.User;

import org.springframework.stereotype.Component;
import java.util.Objects;
import java.util.function.Function;

@Component
public class UserMapper {

    /**
     * Converts User entity to UserResponseDTO
     *
     * @param user the user entity to convert
     * @return UserResponseDTO with mapped fields, or null if input is null
     */
    public UserResponseDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setOnboardingStatus(user.getOnboardingStatus());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setHomeLocation(user.getHomeLocation());
        dto.setWorkLocation(user.getWorkLocation());
        dto.setAvatarUrl(user.getAvatarUrl());

        return dto;
    }

    /**
     * Converts UserResponseDTO to User entity
     * Note: This creates a new User entity. For updates, consider using updateEntity method.
     *
     * @param dto the DTO to convert
     * @return User entity with mapped fields, or null if input is null
     */
    public User toEntity(UserResponseDTO dto) {
        if (dto == null) {
            return null;
        }

        User user = new User();
        user.setId(dto.getId());
        user.setPhone(dto.getPhone());
        user.setRole(dto.getRole());
        user.setOnboardingStatus(dto.getOnboardingStatus());
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setHomeLocation(dto.getHomeLocation());
        user.setWorkLocation(dto.getWorkLocation());
        user.setAvatarUrl(dto.getAvatarUrl());

        return user;
    }

    /**
     * Updates an existing User entity with data from UserResponseDTO
     * Only updates non-null fields from the DTO
     *
     * @param existingUser the existing user entity to update
     * @param dto the DTO containing update data
     */
    public void updateEntity(User existingUser, UserResponseDTO dto) {
        if (existingUser == null || dto == null) {
            return;
        }

        if (dto.getPhone() != null) {
            existingUser.setPhone(dto.getPhone());
        }
        if (dto.getRole() != null) {
            existingUser.setRole(dto.getRole());
        }
        if (dto.getOnboardingStatus() != null) {
            existingUser.setOnboardingStatus(dto.getOnboardingStatus());
        }
        if (dto.getFullName() != null) {
            existingUser.setFullName(dto.getFullName());
        }
        if (dto.getEmail() != null) {
            existingUser.setEmail(dto.getEmail());
        }
        if (dto.getHomeLocation() != null) {
            existingUser.setHomeLocation(dto.getHomeLocation());
        }
        if (dto.getWorkLocation() != null) {
            existingUser.setWorkLocation(dto.getWorkLocation());
        }
        if (dto.getAvatarUrl() != null) {
            existingUser.setAvatarUrl(dto.getAvatarUrl());
        }
        // Note: id, createdAt, updatedAt are not updated as they're managed by the system
    }

    /**
     * Creates a partial User entity from DTO for specific fields
     * Useful for partial updates
     *
     * @param dto the DTO containing fields to map
     * @param fieldsToMap varargs of field names to map
     * @return User entity with only specified fields mapped
     */
    public User toPartialEntity(UserResponseDTO dto, String... fieldsToMap) {
        if (dto == null) {
            return null;
        }

        User user = new User();

        for (String field : fieldsToMap) {
            switch (field) {
                case "id":
                    user.setId(dto.getId());
                    break;
                case "phone":
                    user.setPhone(dto.getPhone());
                    break;
                case "role":
                    user.setRole(dto.getRole());
                    break;
                case "onboardingStatus":
                    user.setOnboardingStatus(dto.getOnboardingStatus());
                    break;
                case "fullName":
                    user.setFullName(dto.getFullName());
                    break;
                case "email":
                    user.setEmail(dto.getEmail());
                    break;
                case "homeLocation":
                    user.setHomeLocation(dto.getHomeLocation());
                    break;
                case "workLocation":
                    user.setWorkLocation(dto.getWorkLocation());
                    break;
                case "avatarUrl":
                    user.setAvatarUrl(dto.getAvatarUrl());
                    break;
                default:
                    // Skip unknown fields
                    break;
            }
        }

        return user;
    }

    /**
     * Functional mapping using Function interface
     * Useful for stream operations
     *
     * @return Function that maps User to UserResponseDTO
     */
    public Function<User, UserResponseDTO> toDTOFunction() {
        return this::toDTO;
    }

    /**
     * Functional mapping using Function interface
     * Useful for stream operations
     *
     * @return Function that maps UserResponseDTO to User
     */
    public Function<UserResponseDTO, User> toEntityFunction() {
        return this::toEntity;
    }

    /**
     * Checks if two objects are equivalent (ignoring system-managed fields)
     * Useful for detecting changes
     *
     * @param user the user entity
     * @param dto the DTO to compare with
     * @return true if business fields match, false otherwise
     */
    public boolean isEquivalent(User user, UserResponseDTO dto) {
        if (user == null && dto == null) return true;
        if (user == null || dto == null) return false;

        return Objects.equals(user.getPhone(), dto.getPhone()) &&
               Objects.equals(user.getRole(), dto.getRole()) &&
               Objects.equals(user.getOnboardingStatus(), dto.getOnboardingStatus()) &&
               Objects.equals(user.getFullName(), dto.getFullName()) &&
               Objects.equals(user.getEmail(), dto.getEmail()) &&
               Objects.equals(user.getHomeLocation(), dto.getHomeLocation()) &&
               Objects.equals(user.getWorkLocation(), dto.getWorkLocation()) &&
               Objects.equals(user.getAvatarUrl(), dto.getAvatarUrl());
    }
}