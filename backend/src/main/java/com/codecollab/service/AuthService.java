package com.codecollab.service;

import com.codecollab.dto.*;
import com.codecollab.entity.User;
import com.codecollab.repository.UserRepository;
import com.codecollab.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Registers a new user with hashed password and returns JWT tokens.
     */
    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create user with BCrypt-hashed password
        User user = User.builder()
                .email(request.getEmail())
                .displayName(request.getDisplayName())
                .password(passwordEncoder.encode(request.getPassword()))
                .lastSeenAt(LocalDateTime.now())
                .build();

        user = userRepository.save(user);

        // Generate token pair
        String accessToken = jwtService.generateAccessToken(
                user.getId(), user.getEmail(), user.getDisplayName());
        String refreshToken = jwtService.generateRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiry() / 1000)
                .user(toUserDTO(user))
                .build();
    }

    /**
     * Authenticates user credentials and returns JWT tokens.
     */
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password against BCrypt hash
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Update last seen
        user.setLastSeenAt(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(
                user.getId(), user.getEmail(), user.getDisplayName());
        String refreshToken = jwtService.generateRefreshToken(user.getId());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiry() / 1000)
                .user(toUserDTO(user))
                .build();
    }

    /**
     * Issues a new access token from a valid refresh token.
     */
    public AuthResponse refresh(String refreshToken) {
        if (!jwtService.isTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String tokenType = jwtService.extractTokenType(refreshToken);
        if (!"REFRESH".equals(tokenType)) {
            throw new RuntimeException("Token is not a refresh token");
        }

        String userId = jwtService.extractUserId(refreshToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtService.generateAccessToken(
                user.getId(), user.getEmail(), user.getDisplayName());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getAccessTokenExpiry() / 1000)
                .user(toUserDTO(user))
                .build();
    }

    /**
     * Returns the current user's profile from the authenticated principal.
     */
    public UserDTO getCurrentUser(User user) {
        return toUserDTO(user);
    }

    private UserDTO toUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
