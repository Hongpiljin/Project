package com.rental.dto;

import java.time.LocalDateTime;

public class ChatMessageDTO {

    private Long messageId;        // 메시지 고유 ID
    private String roomId;         // 채팅방 ID
    private Integer senderId;      // 보낸 사람 (user_no)
    private String message;        // 메시지 내용
    private LocalDateTime sentAt;  // 보낸 시간

    public ChatMessageDTO() {}

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}
