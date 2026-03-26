package com.alphatech.rain.backend.security;

import com.alphatech.rain.backend.repository.UserRepository;
import com.alphatech.rain.backend.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with userId: " + username));

        return new CustomUserPrincipal(user);
    }
}