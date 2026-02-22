package com.codecollab.controller;

import com.codecollab.dto.ChangePasswordRequest;
import com.codecollab.dto.UpdateProfileRequest;
import com.codecollab.dto.UserProfileResponse;
import com.codecollab.entity.User;
import com.codecollab.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username);
        
        UserProfileResponse response = UserProfileResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        String currentUsername = authentication.getName();
        
        User updatedUser = userService.updateUsername(currentUsername, request.getUsername());
        
        UserProfileResponse response = UserProfileResponse.builder()
                .username(updatedUser.getUsername())
                .email(updatedUser.getEmail())
                .message("Profile updated successfully")
                .build();
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/password")
    public ResponseEntity<UserProfileResponse> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        
        userService.changePassword(username, request.getCurrentPassword(), request.getNewPassword());
        
        UserProfileResponse response = UserProfileResponse.builder()
                .message("Password changed successfully")
                .build();
        
        return ResponseEntity.ok(response);
    }
}
