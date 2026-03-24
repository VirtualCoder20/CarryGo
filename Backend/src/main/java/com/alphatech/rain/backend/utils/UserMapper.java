package com.alphatech.rain.backend.utils;


import com.alphatech.rain.backend.dto.response.UserResponseDTO;
import com.alphatech.rain.backend.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserResponseDTO toUserResponseDTO(User user);
}
