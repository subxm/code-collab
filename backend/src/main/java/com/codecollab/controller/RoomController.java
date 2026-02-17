package com.codecollab.controller;

import com.codecollab.dto.*;
import com.codecollab.entity.User;
import com.codecollab.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /**
     * POST /api/rooms — Create a new collaborative room.
     */
    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@Valid @RequestBody RoomCreateRequest request,
            @AuthenticationPrincipal User user) {
        RoomDTO room = roomService.createRoom(request, user.getId());
        return ResponseEntity.ok(room);
    }

    /**
     * GET /api/rooms — List all rooms the authenticated user belongs to.
     */
    @GetMapping
    public ResponseEntity<List<RoomDTO>> getUserRooms(@AuthenticationPrincipal User user) {
        List<RoomDTO> rooms = roomService.getUserRooms(user.getId());
        return ResponseEntity.ok(rooms);
    }

    /**
     * GET /api/rooms/{roomId} — Get room details with member list.
     */
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDTO> getRoom(@PathVariable String roomId,
            @AuthenticationPrincipal User user) {
        RoomDTO room = roomService.getRoom(roomId, user.getId());
        return ResponseEntity.ok(room);
    }

    /**
     * POST /api/rooms/join — Join a room by its room code.
     */
    @PostMapping("/join")
    public ResponseEntity<RoomDTO> joinRoom(@RequestBody Map<String, String> body,
            @AuthenticationPrincipal User user) {
        String roomCode = body.get("roomCode");
        if (roomCode == null || roomCode.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        RoomDTO room = roomService.joinRoom(roomCode, user.getId());
        return ResponseEntity.ok(room);
    }

    /**
     * DELETE /api/rooms/{roomId} — Delete a room (owner only).
     */
    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String roomId,
            @AuthenticationPrincipal User user) {
        roomService.deleteRoom(roomId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
