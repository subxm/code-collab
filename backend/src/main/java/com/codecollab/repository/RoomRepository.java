package com.codecollab.repository;

import com.codecollab.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    Optional<Room> findByRoomCode(String roomCode);

    List<Room> findByOwnerIdAndArchivedAtIsNull(String ownerId);

    boolean existsByRoomCode(String roomCode);
}
