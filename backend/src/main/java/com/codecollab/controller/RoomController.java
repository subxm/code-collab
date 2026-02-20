package com.codecollab.controller;

import com.codecollab.dto.*;
import com.codecollab.entity.User;
import com.codecollab.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(
            @Valid @RequestBody CreateRoomRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.createRoom(request, user));
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getUserRooms(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.getUserRooms(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.getRoomById(id, user));
    }

    @PostMapping("/join")
    public ResponseEntity<RoomResponse> joinRoom(
            @Valid @RequestBody JoinRoomRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.joinRoom(request.getRoomCode(), user));
    }

    @GetMapping("/code/{roomCode}")
    public ResponseEntity<RoomResponse> getRoomByCode(
            @PathVariable String roomCode) {
        return ResponseEntity.ok(roomService.getRoomByCode(roomCode));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRoom(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        roomService.deleteRoom(id, user);
        return ResponseEntity.ok(Map.of("message", "Room deleted successfully"));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<MemberResponse>> getRoomMembers(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(roomService.getRoomMembers(id, user));
    }

    @DeleteMapping("/{id}/members/{userId}")
    public ResponseEntity<Map<String, String>> removeMember(
            @PathVariable Long id,
            @PathVariable Long userId,
            @AuthenticationPrincipal User user) {
        roomService.removeMember(id, userId, user);
        return ResponseEntity.ok(Map.of("message", "Member removed successfully"));
    }
}
