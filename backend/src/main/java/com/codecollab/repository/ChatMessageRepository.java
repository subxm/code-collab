package com.codecollab.repository;

import com.codecollab.entity.ChatMessage;
import com.codecollab.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomOrderByCreatedAtAsc(Room room);
    List<ChatMessage> findTop50ByRoomOrderByCreatedAtDesc(Room room);
}
