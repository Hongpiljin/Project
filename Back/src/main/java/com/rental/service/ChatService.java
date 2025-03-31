package com.rental.service;

import java.time.LocalDateTime;
import java.util.List;

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

    public List<ChatRoomDTO> getChatRooms(String status) {
        return chatMapper.selectChatRooms(status);
    }

    public void rejectRoom(String roomId) {
        chatMapper.updateRoomStatusToRejected(roomId, LocalDateTime.now());
    }

    public void acceptRoom(String roomId, Integer consultantId) {
        chatMapper.updateRoomStatusToActive(roomId, consultantId, LocalDateTime.now());
    }

    public void saveMesage(ChatMessageDTO message) {
        chatMapper.insertChatMessage(message);
    }
}
