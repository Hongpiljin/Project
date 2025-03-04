package com.rental.mapper;

import com.rental.dto.RentalCarDTO;
import com.rental.dto.RentalReservationDTO;
import com.rental.dto.RentalPaymentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface RentalCarMapper {

    /** ✅ 모든 렌트카 조회 */
    List<RentalCarDTO> findAllRentalCars();

    /** ✅ 특정 렌트카 정보 조회 */
    RentalCarDTO findRentalCarById(String rentalCarNo);

    /** ✅ 사용자 번호 조회 (userId → userNo) */
    Integer getUserNoByUserId(String userId);

    /** ✅ 렌트카 예약 가능 여부 확인 */
    boolean checkCarAvailability(@Param("rentalCarNo") String rentalCarNo,
                                 @Param("startDate") LocalDate startDate,
                                 @Param("endDate") LocalDate endDate);

    /** ✅ 렌트카 예약 등록 */
    int insertReservation(RentalReservationDTO reservationDTO);

    /** ✅ 사용자 포인트 조회 */
    Integer getUserPoint(@Param("userNo") int userNo);

    /** ✅ 사용자 포인트 차감 */
    void updateUserPoint(@Param("userNo") int userNo, @Param("totalPrice") double totalPrice);

    /** ✅ 렌트카 결제 정보 저장 */
    int insertRentalPayment(@Param("userNo") int userNo, @Param("rentalPaymentDTO") RentalPaymentDTO rentalPaymentDTO);

    /** ✅ 가장 최근 예약 ID 가져오기 */
    Long getLatestReservationId();

    /** ✅ 가장 최근 결제 ID 가져오기 */
    long getLatestPaymentId();

    /** ✅ 사용자 정보 조회 */
    Map<String, Object> getUserInfo(Integer userNo);
}
