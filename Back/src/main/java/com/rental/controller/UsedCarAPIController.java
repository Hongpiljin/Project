package com.rental.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.rental.dto.UsedCarDTO;
import com.rental.service.UsedCarAPIService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/chatbot/cars") //  챗봇 전용 API 컨트롤러 (URL 오타 수정)
public class UsedCarAPIController {

    private final UsedCarAPIService usedCarAPIService;

    public UsedCarAPIController(UsedCarAPIService usedCarAPIService) {
        this.usedCarAPIService = usedCarAPIService;
    }

    // 챗봇에서 지역별 차량 목록 조회
    @GetMapping
    public List<UsedCarDTO> getCarKakao(@RequestParam String dealerLocation) {
        List<UsedCarDTO> cars = usedCarAPIService.getCarChatBot(dealerLocation); // ✅ 올바르게 인스턴스를 통해 호출
        System.out.println("지역별 차량 정보: " + cars);
        return cars;
    }

    // ✅ 카카오 챗봇에서 특정 차량 상세 조회
    @GetMapping("/vehicle/{vehiclePlate}")
public UsedCarDTO getCarByVehicleNo(@PathVariable String vehiclePlate) {
    UsedCarDTO car = usedCarAPIService.getCarByvehiclePlate(vehiclePlate);
    System.out.println("차량 번호 정보: " + car);
    return car;
}
}
