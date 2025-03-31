package com.rental.dto;

import java.time.LocalDateTime;

public class ChatRoomDTO {

    private String roomId;          // 채팅방 ID (UUID)
    private Integer userNo;         // 사용자 번호
    private Integer adminNo;        // 상담사 번호 (null 가능)
    private String status;          // 상태: waiting / active / closed
    private LocalDateTime createdAt;
    private LocalDateTime closedAt;

    // 생성자, getter/setter
    public ChatRoomDTO() {}

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public Integer getUserNo() {
        return userNo;
    }

    public void setUserNo(Integer userNo) {
        this.userNo = userNo;
    }

    public Integer getAdminNo() {
        return adminNo;
    }

    public void setAdminNo(Integer adminNo) {
        this.adminNo = adminNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(LocalDateTime closedAt) {
        this.closedAt = closedAt;
    }
}
