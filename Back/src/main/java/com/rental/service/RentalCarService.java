package com.rental.service;

import com.rental.dto.RentalCarDTO;
import com.rental.dto.RentalReservationDTO;
import com.rental.dto.RentalPaymentDTO;
import com.rental.mapper.RentalCarMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class RentalCarService {

    private final RentalCarMapper rentalCarMapper;

    @Autowired
    public RentalCarService(RentalCarMapper rentalCarMapper) {
        this.rentalCarMapper = rentalCarMapper;
    }

    /** ✅ 모든 렌트카 조회 */
    public List<RentalCarDTO> findAllRentalCars() {
        return rentalCarMapper.findAllRentalCars();
    }

    /** ✅ 특정 렌트카 정보 조회 */
    public RentalCarDTO findRentalCarById(String rentalCarNo) {
        return rentalCarMapper.findRentalCarById(rentalCarNo);
    }

    /** ✅ 사용자 번호 조회 (userId → userNo) */
    public Integer getUserNoByUserId(String userId) {
        return rentalCarMapper.getUserNoByUserId(userId);
    }

    /** ✅ 렌트카 예약 및 결제 트랜잭션 */
    @Transactional
    public Long processReservationAndPayment(RentalReservationDTO reservationDTO, RentalPaymentDTO rentalPaymentDTO, int userNo) {
        // 🚀 1. 렌트카 예약 저장
        int result = rentalCarMapper.insertReservation(reservationDTO);
        if (result <= 0) {
            throw new RuntimeException("🚨 예약 정보 저장 실패");
        }

        // ✅ 2. 예약 ID 가져오기
        Long reservationId = rentalCarMapper.getLatestReservationId();
        if (reservationId == null) {
            throw new RuntimeException("🚨 예약 ID 조회 실패 (예약이 정상적으로 저장되지 않음)");
        }

        // ✅ 3. 예약 ID를 결제 정보에 추가
        rentalPaymentDTO.setReservationId(reservationId);

        // ✅ 4. 결제 처리 (포인트 확인 및 차감)
        int userPoint = rentalCarMapper.getUserPoint(userNo);
        if (userPoint < rentalPaymentDTO.getTotalPrice()) {
            throw new RuntimeException("🚨 포인트 부족 - 결제 실패");
        }

        // ✅ 5. 포인트 차감
        rentalCarMapper.updateUserPoint(userNo, rentalPaymentDTO.getTotalPrice());

        // ✅ 6. 결제 정보 저장
        int paymentResult = rentalCarMapper.insertRentalPayment(userNo, rentalPaymentDTO);
        if (paymentResult <= 0) {
            throw new RuntimeException("🚨 결제 정보 저장 실패");
        }

        return reservationId; // 성공적으로 저장된 예약 ID 반환
    }

    /** ✅ 렌트카 예약 처리 (단독 예약) */
    @Transactional
    public Long processReservation(RentalReservationDTO reservationDTO) {
        int result = rentalCarMapper.insertReservation(reservationDTO);
        if (result <= 0) {
            throw new RuntimeException("🚨 예약 정보 저장 실패");
        }

        Long reservationId = rentalCarMapper.getLatestReservationId();
        if (reservationId == null) {
            throw new RuntimeException("🚨 예약 ID 조회 실패");
        }

        return reservationId;
    }

    /** ✅ 렌트카 결제 처리 */
    @Transactional
    public long processRentalPayment() {
        return 0;
    
    }

    /** ✅ 사용자 정보 조회 */
    public Map<String, Object> getUserInfo(Integer userNo) {
        return rentalCarMapper.getUserInfo(userNo);
    }
}
