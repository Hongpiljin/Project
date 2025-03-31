package com.rental.mapper;

import com.rental.dto.ChatMessageDTO;
import com.rental.dto.ChatRoomDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ChatMapper {

    void insertChatRoom(ChatRoomDTO chatRoom);

    void updateRoomStatusToClosed(@Param("roomId") String roomId, @Param("closedAt") LocalDateTime closedAt);

    List<ChatRoomDTO> selectChatRooms(@Param("status") String status);

    void updateRoomStatusToActive(@Param("roomId") String roomId,
    @Param("consultantId") Integer consultantId,
    @Param("acceptedAt") LocalDateTime acceptedAt);

    void updateRoomStatusToRejected(@Param("roomId") String roomId,
    @Param("rejectedAt") LocalDateTime rejectedAt);

    void insertChatMessage(ChatMessageDTO message);
}
