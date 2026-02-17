package com.codecollab.repository;

import com.codecollab.entity.RoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, RoomMember.RoomMemberId> {
    List<RoomMember> findByRoomId(String roomId);

    List<RoomMember> findByUserId(String userId);

    Optional<RoomMember> findByRoomIdAndUserId(String roomId, String userId);

    boolean existsByRoomIdAndUserId(String roomId, String userId);

    long countByRoomId(String roomId);

    @Query("SELECT rm FROM RoomMember rm WHERE rm.userId = :userId")
    List<RoomMember> findAllRoomsForUser(String userId);
}
