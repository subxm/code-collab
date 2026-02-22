package com.codecollab.service;

import com.codecollab.dto.CreateRoomRequest;
import com.codecollab.dto.JoinRoomRequest;
import com.codecollab.dto.RoomResponse;
import com.codecollab.entity.Room;
import com.codecollab.entity.RoomMember;
import com.codecollab.entity.User;
import com.codecollab.repository.RoomMemberRepository;
import com.codecollab.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;
    
    @Transactional
    public RoomResponse createRoom(CreateRoomRequest request, User user) {
        String inviteCode = UUID.randomUUID().toString().substring(0, 8);
        
        Room room = Room.builder()
                .name(request.getName())
                .description(request.getDescription())
                .inviteCode(inviteCode)
                .owner(user)
                .build();
        
        room = roomRepository.save(room);
        
        // Add creator as member
        RoomMember member = RoomMember.builder()
                .room(room)
                .user(user)
                .build();
        
        roomMemberRepository.save(member);
        
        return toRoomResponse(room);
    }
    
    @Transactional
    public RoomResponse joinRoom(JoinRoomRequest request, User user) {
        Room room = roomRepository.findByInviteCode(request.getInviteCode())
                .orElseThrow(() -> new RuntimeException("Invalid invite code"));
        
        if (roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are already a member of this room");
        }
        
        RoomMember member = RoomMember.builder()
                .room(room)
                .user(user)
                .build();
        
        roomMemberRepository.save(member);
        
        return toRoomResponse(room);
    }
    
    public List<RoomResponse> getMyRooms(User user) {
        List<RoomMember> memberships = roomMemberRepository.findByUser(user);
        return memberships.stream()
                .map(membership -> toRoomResponse(membership.getRoom()))
                .collect(Collectors.toList());
    }
    
    public RoomResponse getRoomById(Long roomId, User user) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        
        if (!roomMemberRepository.existsByRoomAndUser(room, user)) {
            throw new RuntimeException("You are not a member of this room");
        }
        
        return toRoomResponse(room);
    }
    
    private RoomResponse toRoomResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .name(room.getName())
                .description(room.getDescription())
                .inviteCode(room.getInviteCode())
                .ownerUsername(room.getOwner().getUsername())
                .memberCount(roomMemberRepository.findByRoom(room).size())
                .build();
    }
}
