package com.codecollab.controller;

import com.codecollab.dto.CreateRoomRequest;
import com.codecollab.dto.JoinRoomRequest;
import com.codecollab.dto.RoomResponse;
import com.codecollab.entity.User;
import com.codecollab.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    
    private final RoomService roomService;
    
    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(
            @Valid @RequestBody CreateRoomRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(roomService.createRoom(request, user));
    }
    
    @PostMapping("/join")
    public ResponseEntity<RoomResponse> joinRoom(
            @Valid @RequestBody JoinRoomRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(roomService.joinRoom(request, user));
    }
    
    @GetMapping
    public ResponseEntity<List<RoomResponse>> getMyRooms(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.getMyRooms(user));
    }
    
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> getRoomById(
            @PathVariable Long roomId,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(roomService.getRoomById(roomId, user));
    }
}
