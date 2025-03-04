package com.rental.controller;

import com.rental.service.RentalCarService;
import com.rental.dto.RentalCarDTO;
import com.rental.dto.RentalReservationDTO;
import com.rental.dto.RentalPaymentDTO;
import com.rental.token.TokenProvider;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rental")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RentalCarController {

    private final RentalCarService rentalCarService;
    private final TokenProvider tokenProvider;

    @Autowired
    public RentalCarController(RentalCarService rentalCarService, TokenProvider tokenProvider) {
        this.rentalCarService = rentalCarService;
        this.tokenProvider = tokenProvider;
    }

    /** ✅ 모든 렌트카 목록 조회 */
    @GetMapping("/list")
    public ResponseEntity<List<RentalCarDTO>> findAllRentalCars() {
        List<RentalCarDTO> carList = rentalCarService.findAllRentalCars();
        return carList.isEmpty() ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(null) : ResponseEntity.ok(carList);
    }

    /** ✅ 특정 렌트카 정보 조회 */
    @GetMapping("/list/{rentalCarNo}")
    public ResponseEntity<?> findRentalCarById(@PathVariable String rentalCarNo) {
        RentalCarDTO car = rentalCarService.findRentalCarById(rentalCarNo);
        return car == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 차량을 찾을 수 없습니다.")
                : ResponseEntity.ok(car);
    }

    /** ✅ 렌트카 예약 요청 */
    @PostMapping("/reservation")
    public ResponseEntity<Map<String, Object>> reserveCar(
            @CookieValue(value = "token", required = false) String token,
            @RequestBody RentalReservationDTO reservationDTO) {

        if (token == null || !tokenProvider.isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "유효하지 않은 토큰입니다."));
        }

        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "사용자 정보를 가져올 수 없습니다."));
        }

        reservationDTO.setUserId(userId);
        Long reservationId = rentalCarService.processReservation(reservationDTO);

        if (reservationId == -1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "예약 실패: 오류 발생"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("reservationId", reservationId);
        return ResponseEntity.ok(response);
    }

    /** ✅ 렌트카 결제 요청 */

    /** ✅ 렌트카 사용자 정보 조회 API */
    @GetMapping("/user/info")
    public ResponseEntity<Map<String, Object>> getRentalUserInfo(
            @CookieValue(value = "token", required = false) String token) {

        System.out.println("📌 [API 요청] /rental/user/info 호출됨");

        // ✅ 토큰이 없을 경우 401 반환
        if (token == null) {
            System.out.println("⚠️ 토큰이 포함되지 않음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 필요합니다."));
        }

        // ✅ 토큰 검증
        if (!tokenProvider.isValidToken(token)) {
            System.out.println("❌ 유효하지 않은 토큰");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 유효하지 않습니다."));
        }

        // ✅ 토큰에서 사용자 정보 추출
        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);
        Integer userNo = rentalCarService.getUserNoByUserId(userId);
        System.out.println("📌 추출된 userNo 값: " + userNo);

        // ✅ 사용자 정보 조회
        if (userNo == null) {
            System.out.println("❌ userNo 조회 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "존재하지 않는 사용자입니다."));
        }

        Map<String, Object> userInfo = rentalCarService.getUserInfo(userNo);
        if (userInfo != null) {
            System.out.println("✅ 사용자 정보 조회 성공: " + userInfo);
            return ResponseEntity.ok(userInfo);
        } else {
            System.out.println("❌ 사용자 정보 조회 실패: userNo=" + userNo);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "사용자 정보를 찾을 수 없습니다."));
        }
    }

}
