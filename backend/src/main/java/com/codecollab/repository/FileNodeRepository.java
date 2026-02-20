package com.codecollab.repository;

import com.codecollab.entity.FileNode;
import com.codecollab.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileNodeRepository extends JpaRepository<FileNode, Long> {
    List<FileNode> findByRoomOrderBySortOrder(Room room);

    List<FileNode> findByRoomAndParentIsNullOrderBySortOrder(Room room);

    List<FileNode> findByParentOrderBySortOrder(FileNode parent);
}
