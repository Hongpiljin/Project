package com.rental.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rental.dto.ChatMessageDTO;
import com.rental.dto.ChatRoomDTO;
import com.rental.service.ChatService;

@Controller
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessageDTO message) {
        System.out.println("💬 채팅방[" + message.getRoomId() + "] 메시지 :" + message.getMessage()+message.getSenderId());
        message.setSentAt(LocalDateTime.now());
        String destination = "/topic/chatroom." + message.getRoomId();
        messagingTemplate.convertAndSend(destination, message);
        
        chatService.saveMesage(message);
    }

    @PostMapping("/chat/start")
    public ResponseEntity<String> startChat(@RequestParam Integer userNo,@RequestParam String userName) {
        String sanitizedUserName = userName.trim().replaceAll("\\s+","");
        
        String roomId = sanitizedUserName + "-" + userNo + "_" + UUID.randomUUID().toString();
        ChatRoomDTO room = new ChatRoomDTO();
        room.setRoomId(roomId);
        room.setUserNo(userNo);
        room.setStatus("waiting");
        room.setCreatedAt(LocalDateTime.now());

        chatService.createRoom(room);
        return ResponseEntity.ok(roomId);
    }

    @PostMapping("/chat/close")
    public ResponseEntity<String> closeChat(@RequestParam String roomId) {
        chatService.closeRoom(roomId);
        return ResponseEntity.ok(roomId);
    }

 @GetMapping("/chat/rooms")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@RequestParam(required = false) String status) {
        List<ChatRoomDTO> rooms = chatService.getChatRooms(status);
        return ResponseEntity.ok(rooms);
    }
    @PostMapping("/chat/accept")
    public ResponseEntity<String> acceptChat(@RequestParam String roomId, @RequestParam Integer consultantId) {
        chatService.acceptRoom(roomId, consultantId);
        
        ChatMessageDTO systemMessage = new ChatMessageDTO();
        systemMessage.setRoomId(roomId);
        systemMessage.setSenderId(-1); 
        systemMessage.setMessage("상담사가 입장했습니다");
        systemMessage.setSentAt(LocalDateTime.now());

        String destination = "/topic/chatroom." + roomId;
        messagingTemplate.convertAndSend(destination, systemMessage);
        
        return ResponseEntity.ok("채팅방 수락됨");
    }

@PostMapping("/chat/reject")
public ResponseEntity<String> rejectChat(@RequestParam String roomId) {
 chatService.rejectRoom(roomId);
 return ResponseEntity.ok("채팅방 거절됨");
}
}
