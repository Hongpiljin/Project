package com.rental.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.dto.UsedCarDTO;
import com.rental.dto.UsedCarImageDTO;
import com.rental.dto.UsedCarPaymentDTO; // 사용자가 정의한 결제 DTO (예시)
import com.rental.dto.UserDTO;
import com.rental.mapper.UserMapper;
import com.rental.service.UsedCarService;
import com.rental.service.UserService;
import com.rental.token.TokenProvider;
import io.jsonwebtoken.Claims;

import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/used-cars")
@CrossOrigin(origins = "localhost:3000") // CORS 허용
public class UsedCarController {
    private final UserMapper userMapper;
    private final UsedCarService usedCarService;
    private final TokenProvider tokenProvider;
    private final UserService userService;
    
    public UsedCarController(UsedCarService usedCarService,
            TokenProvider tokenProvider,
            UserService userService,
            UserMapper userMapper) { // 추가된 부분
        this.usedCarService = usedCarService;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
        this.userMapper = userMapper; // 주입받음
    }

    // 차량 전체 조회 ***
    @GetMapping("/getFilteredUsedCars")
    public Map<String, Object> getFilteredUsedCars(
            @RequestParam(required = false) String vehicleName,
            @RequestParam(required = false) String vehicleType,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer modelYear,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String dealerLocation,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) String driveType,
            @RequestParam(required = false) Integer minKm,
            @RequestParam(required = false) Integer maxKm,
            @RequestParam(required = false) Integer seatingCapacity,
            @RequestParam(required = false, defaultValue = "carkm") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "20") Integer itemsPerPage) {

        if (!isValidSortBy(sortBy))
            sortBy = "carkm";
        if (!isValidOrder(order))
            order = "asc";

        int offset = (page - 1) * itemsPerPage;
        System.out.println("offset : " + offset );
        List<UsedCarDTO> cars = usedCarService.getFilteredUsedCars(
                vehicleName, vehicleType, brand, modelYear, minPrice, maxPrice, color, dealerLocation,
                fuelType, transmission, driveType, minKm, maxKm, seatingCapacity, sortBy, order, offset,itemsPerPage);
        // BLOB → Base64 변환
        for (UsedCarDTO car : cars) {
            car.ensureBase64MainImage();
        }

        int totalCount = usedCarService.getFilteredUsedCarsCount(
                vehicleName, vehicleType, brand, modelYear, minPrice, maxPrice, color, dealerLocation,
                fuelType, transmission, driveType, minKm, maxKm, seatingCapacity);

        Map<String, Object> result = new HashMap<>();
        result.put("cars", cars);
        result.put("totalCount", totalCount);

        return result;
    }

    // 차량 정보 상세***
    @GetMapping("/detail")
    public UsedCarDTO getCarDetail(@RequestParam String vehicleNo) {
        UsedCarDTO carDTO = usedCarService.getCarByVehicleNo(vehicleNo);

        //  BLOB → Base64 변환
        carDTO.ensureBase64MainImage();

        return carDTO;
    }

    // 차량 정보 수정 ** ADMIN
    @PostMapping(value = "/update-car-details", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateCarDetails(
            @RequestPart("carData") String carDataJson,
            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            UsedCarDTO usedCarDTO = mapper.readValue(carDataJson, UsedCarDTO.class);
    
            System.out.println("🚀 차량 정보 업데이트 요청: " + usedCarDTO.getVehicleNo());
    
            // 대표 이미지 처리 (Base64 → byte[] 변환)
            if (usedCarDTO.getMainImage() != null && usedCarDTO.getMainImage().length > 0) {
                String mainImageString = new String(usedCarDTO.getMainImage(), StandardCharsets.UTF_8);
                if (mainImageString.startsWith("http://") || mainImageString.startsWith("https://")
                        || mainImageString.startsWith("//")) {
                    usedCarDTO.setMainImage(downloadImageAsBytes(mainImageString));
                } else if (mainImageString.startsWith("data:image")) {
                    String base64Data = mainImageString.substring(mainImageString.indexOf(",") + 1);
                    usedCarDTO.setMainImage(Base64.getDecoder().decode(base64Data));
                }
            }
    
            // 다중 이미지 업로드 처리 → **새로 업로드한 이미지 파일만 INSERT**
            List<UsedCarImageDTO> newImageDTOList = new ArrayList<>();
            if (images != null && images.length > 0) {
                for (MultipartFile image : images) {
                    System.out.println(" 처리 중인 이미지 파일: " + image.getOriginalFilename());
    
                    UsedCarImageDTO imageDTO = new UsedCarImageDTO();
                    imageDTO.setVehicleNo(usedCarDTO.getVehicleNo());
                    System.out.println("차량 번호: " + usedCarDTO.getVehicleNo());
                    imageDTO.setImageData(image.getBytes()); // byte[] 변환
                    imageDTO.setImageType(image.getContentType());
                    imageDTO.setMainImageStatus("N"); // 기본적으로 대표 이미지 아님
                    newImageDTOList.add(imageDTO);
                }
    
                // 첫 번째 새 이미지가 있으면 대표 이미지로 지정
                if (!newImageDTOList.isEmpty()) {
                    newImageDTOList.get(0).setMainImageStatus("Y");
                    System.out.println(" 대표 이미지 설정 완료: " + newImageDTOList.get(0).getImageType());
                }
            }
            // 기존 서버 이미지는 재삽입하지 않도록 처리 (이미 삭제 요청은 payload의 deletedImageIds에 있음)
            usedCarDTO.setUsedCarImages(newImageDTOList);
    
            // 서비스 호출 (서비스에서는 deletedImageIds에 있는 이미지 삭제 처리 후 새 이미지 INSERT)
            usedCarService.updateCarDetails(usedCarDTO);
    
            System.out.println(" 차량 정보 업데이트 완료: " + usedCarDTO.getVehicleNo());
    
            return ResponseEntity.ok("차량 정보 수정 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Base64 디코딩 오류: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("수정 중 오류 발생: " + e.getMessage());
        }
    }
    

    private byte[] downloadImageAsBytes(String imageUrl) throws Exception {
        try (InputStream in = new URL(imageUrl).openStream()) {
            return in.readAllBytes();
        }
    }

    private boolean isValidSortBy(String sortBy) {
        return sortBy != null && (sortBy.equals("car_km") || sortBy.equals("price") || sortBy.equals("model_year"));
    }

    private boolean isValidOrder(String order) {
        return order != null && (order.equals("asc") || order.equals("desc"));
    }

    // 중고차 결제 ***
    // 🚗 중고차 결제 엔드포인트 추가 (사용자 정의 DTO를 받아 결제 처리)
    @PostMapping("/payment")
    public ResponseEntity<Map<String, Object>> processCarPayment(
            @CookieValue(value = "token", required = false) String token,
            @RequestBody UsedCarPaymentDTO paymentDTO) {

        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 포함되지 않았습니다."));
        }
        if (!tokenProvider.isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 유효하지 않습니다."));
        }

        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);
        Integer userNo = userService.getUserNoByUserId(userId);

        if (userNo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "존재하지 않는 사용자입니다."));
        }

        // 프론트엔드에서 계산된 결제 금액 및 결제일이 전달된다고 가정
        try {
            // Service 내에서 결제 금액 등의 처리를 수행하고, 결제 정보를 DB에 저장
            int paymentNo = usedCarService.processCarPayment(userNo, paymentDTO);

            // 결제 완료 후 소프트 딜리트 등 추가 작업
            usedCarService.softDeleteUsedCar(paymentDTO.getVehicleNo());

            Map<String, Object> response = new HashMap<>();
            response.put("paymentNo", paymentNo);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "결제 처리 중 오류 발생: " + e.getMessage()));
        }
    }

    // 유저 포인트 조회 ***
    @GetMapping("/point")
    public ResponseEntity<Map<String, Object>> getUserPoint(@RequestParam String userId) {
        try {
            UserDTO user = userMapper.findById(userId); // 인스턴스 호출
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "사용자를 찾을 수 없습니다."));
            }
            int point = user.getPoint(); // DB에 저장된 포인트 값

            // 사용자 정보와 포인트를 함께 반환
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("userPoint", point);

            System.out.println("userId: " + userId + ", point: " + point);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "포인트 조회 중 오류 발생: " + e.getMessage()));
        }
    }

    // 유저 정보 조회 ***
    @GetMapping("/user/info")
    public ResponseEntity<?> getUserInfo(@CookieValue(value = "token", required = false) String token) {
        if (token == null || !tokenProvider.isValidToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "토큰이 유효하지 않습니다."));
        }
        Claims claims = tokenProvider.getClaims(token);
        String userId = claims.get("userId", String.class);
        UserDTO user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "사용자 정보를 찾을 수 없습니다."));
        }
        return ResponseEntity.ok(user);
    }

}
