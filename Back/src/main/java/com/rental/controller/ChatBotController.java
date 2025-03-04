package com.rental.controller;

import java.text.NumberFormat;
import java.util.Locale;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.rental.dto.UsedCarDTO;
import com.rental.service.UsedCarAPIService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ChatBot")
public class ChatBotController {

    private final UsedCarAPIService usedCarAPIService;

    public ChatBotController(UsedCarAPIService usedCarAPIService) {
        this.usedCarAPIService = usedCarAPIService;
    }

    @PostMapping("/webhook")
    public Map<String, String> chatbotResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("userMessage");
        String botResponse = "";

        if (userMessage.equalsIgnoreCase("서울")
                || userMessage.equalsIgnoreCase("경기")
                || userMessage.equalsIgnoreCase("대전")
                || userMessage.equalsIgnoreCase("인천")
                || userMessage.equalsIgnoreCase("부산")
                || userMessage.equalsIgnoreCase("대구")) {
            
            // 지역별 차량 목록 조회
            List<UsedCarDTO> cars = usedCarAPIService.getCarChatBot(userMessage);
            StringBuilder sb = new StringBuilder(userMessage + " 차량 목록:\n");

            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.KOREA); // ₩ 적용

            for (UsedCarDTO car : cars) {
                sb.append("- ").append(car.getVehicleName())
                  .append(" (").append(car.getBrand()).append(") - ")
                  .append(currencyFormat.format(car.getPrice())) // 가격 포맷 적용
                  .append("\n");
            }
            botResponse = sb.toString();
        } else if (userMessage.toLowerCase().startsWith("상세조회")) {
            // "상세조회 {차량번호}" 입력 처리
            String[] parts = userMessage.split(" ", 2);
            if (parts.length >= 2) {
                String vehiclePlate = parts[1].trim();
                if (vehiclePlate.isEmpty()) {
                    botResponse = "차량 번호를 입력해주세요. 예: '상세조회 46가1281'";
                } else {
                    UsedCarDTO car = usedCarAPIService.getCarByvehiclePlate(vehiclePlate);
                    if (car != null) {
                        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.KOREA); // ₩ 적용
                        botResponse = "차량 상세 정보:\n"
                                + "이름: " + car.getVehicleName() + "\n"
                                + "브랜드: " + car.getBrand() + "\n"
                                + "연식: " + car.getModelYear() + "\n"
                                + "가격: " + currencyFormat.format(car.getPrice()) + "\n" // 가격 포맷 적용
                                + "지역: " + car.getDealerLocation() + "\n"
                                + "번호: " + car.getVehicleNo();
                    } else {
                        botResponse = "해당 차량 번호의 정보를 찾을 수 없습니다.";
                    }
                }
            } else {
                botResponse = "차량 번호를 입력해주세요. 예: '상세조회 46가1281'";
            }
        } else if (userMessage.equalsIgnoreCase("안녕")) {
            botResponse = "안녕하세요! 무엇을 도와드릴까요?";
        } else if (userMessage.equalsIgnoreCase("차량 목록")) {
            botResponse = "원하는 지역을 입력해주세요 (예: 서울, 부산)";
        } else if (userMessage.equalsIgnoreCase("고객센터 문의")) {
            botResponse = "고객센터 문의를 진행하시려면 다음 링크를 클릭해주세요: http://localhost:3000/customer-service";
        } else if (userMessage.equalsIgnoreCase("고객센터 번호가 뭐야")) {
            botResponse = "고객센터 번호는 02-1111-1111입니다! 추가 문의 사항 있으신가요?";
        } else if (userMessage.equalsIgnoreCase("차량은 언제 도착하나요 ?")) {
            botResponse = "차량은 구매일 이후 1~2일 내에 오후 16시~20시 사이에 도착합니다 ^^";
        } else {
            botResponse = "죄송해요, 이해하지 못했어요. 다시 입력해주세요!";
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", botResponse);
        return response;
    }
}
