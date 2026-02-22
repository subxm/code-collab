package com.codecollab.repository;

import com.codecollab.entity.FileNode;
import com.codecollab.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileNodeRepository extends JpaRepository<FileNode, Long> {
    List<FileNode> findByRoom(Room room);
    List<FileNode> findByRoomOrderBySortOrder(Room room);
    List<FileNode> findByParent(FileNode parent);
}
