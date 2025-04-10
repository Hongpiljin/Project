package com.rental.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.rental.dto.ChatMessageDTO;
import com.rental.dto.ChatRoomDTO;
import com.rental.mapper.ChatMapper;

@Service
public class ChatService {

    private final ChatMapper chatMapper;

    public ChatService(ChatMapper chatMapper) {
        this.chatMapper = chatMapper;
    }

    public void createRoom(ChatRoomDTO room) {
        room.setCreatedAt(LocalDateTime.now());
        room.setStatus("waiting");
        chatMapper.insertChatRoom(room);
    }

    public void closeRoom(String roomId) {
        chatMapper.updateRoomStatusToClosed(roomId, LocalDateTime.now());
    }

    public List<ChatRoomDTO> getChatRooms(String status, String adminName) {
        return chatMapper.selectChatRooms(status, adminName);
    }

    public void rejectRoom(String roomId) {
        chatMapper.updateRoomStatusToRejected(roomId, LocalDateTime.now());
    }

    public void acceptRoom(String roomId, Integer consultantId, String adminName) {
        chatMapper.updateRoomStatusToActive(roomId, consultantId, adminName, LocalDateTime.now());
    }

    public void saveMesage(ChatMessageDTO message) {
        chatMapper.insertChatMessage(message);
    }

    public Page<ChatRoomDTO> selectChatRoom(String adminName, String status, Pageable pageable) {
        List<ChatRoomDTO> rooms;

        if ((adminName == null || adminName.trim().isEmpty()) && (status == null || status.trim().isEmpty())) {
            rooms = chatMapper.selectChatRooms(null, null); // 모든 채팅방
        } else {
            rooms = chatMapper.selectChatRooms(adminName, status); // adminName 또는 status 조건 포함
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), rooms.size());
        List<ChatRoomDTO> subList = rooms.subList(start, end);

        return new PageImpl<>(subList, pageable, rooms.size());
    }
}
