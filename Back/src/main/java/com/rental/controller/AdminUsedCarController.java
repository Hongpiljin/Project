package com.rental.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.dto.UsedCarDTO;
import com.rental.dto.UsedCarImageDTO;
import com.rental.service.UsedCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/used-cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React 연동 시 CORS 해결
public class AdminUsedCarController {

    private final UsedCarService usedCarService;
    private static final String IMAGE_UPLOAD_DIR = "C:/car-images/";
    private static final String DEFAULT_IMAGE_URL = "/images/usedcar_imageX.png";

    //ADMIN 전체 중고차 목록 조회 API
    @GetMapping
    public ResponseEntity<List<UsedCarDTO>> getAllUsedCars() {
        List<UsedCarDTO> usedCars = usedCarService.getAllUsedCars();
        return ResponseEntity.ok(usedCars);
    }

    // 차량 삭제 API
    @DeleteMapping("/{vehicleNo}")
    public ResponseEntity<String> deleteUsedCar(@PathVariable String vehicleNo) {
        usedCarService.deleteUsedCar(vehicleNo);
        return ResponseEntity.ok("삭제 완료");
    }

    // 차량 등록(INSERT) API
    @PostMapping(value = "/add-car-details", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addCarDetails(
            @RequestPart("carData") String carDataJson,  
            @RequestPart(value = "images", required = false) MultipartFile[] images) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            UsedCarDTO usedCarDTO = mapper.readValue(carDataJson, UsedCarDTO.class);
    
            // mainImage(Base64)를 byte[]로 변환
            if (usedCarDTO.getMainImage() != null) {
                String mainImageBase64 = new String(usedCarDTO.getMainImage());
                if (!mainImageBase64.isEmpty()) {
                    usedCarDTO.setMainImage(Base64.getDecoder().decode(mainImageBase64));
                }
            }
            //  Base64 값만 디코딩하도록 수정
if (usedCarDTO.getMainImage() != null && usedCarDTO.getMainImage().length > 0) {
    String mainImageBase64 = new String(usedCarDTO.getMainImage());
    if (!mainImageBase64.contains("/") && !mainImageBase64.contains(".")) {  
        // ✅ Base64 데이터만 디코딩 (파일 경로가 들어오는 경우 무시)
        usedCarDTO.setMainImage(Base64.getDecoder().decode(mainImageBase64));
    } else {
        usedCarDTO.setMainImage(null); // 파일 경로일 경우 null 처리
    }
}
    
            //  이미지 저장 처리
            List<UsedCarImageDTO> imageDTOList = new ArrayList<>();
            if (images != null && images.length > 0) {
                for (MultipartFile image : images) {
                    if (!image.isEmpty()) {
                        UsedCarImageDTO imageDTO = new UsedCarImageDTO();
                        imageDTO.setImageData(image.getBytes()); // byte[]로 변환
                        imageDTO.setImageType(image.getContentType());
                        imageDTOList.add(imageDTO);
                    }
                }
            }
    
            //  차량 데이터 저장
            usedCarService.addCarDetails(usedCarDTO, imageDTOList);
    
            return ResponseEntity.ok("차량 등록이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("등록 중 오류 발생: " + e.getMessage());
        }
    }
    
    

    //  MultipartFile → byte[] 변환 (이미지 저장 로직)
    private UsedCarImageDTO saveImageToStorage(MultipartFile image) throws Exception {
        UsedCarImageDTO imageDTO = new UsedCarImageDTO();
        imageDTO.setImageData(image.getBytes()); // 이미지 데이터를 byte[]로 변환
        imageDTO.setImageType(image.getContentType()); // 이미지 타입 저장
        return imageDTO;
    }
}