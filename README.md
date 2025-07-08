# KH 결사대 Final_Project
># 차량 용품 , 렌트카 , 중고차 판매 사이트
>## 🏆 팀 소개

>### 1. 팀 이름
KH 결사대

>### 2. 팀원
- **팀장**: 이현성  
- **팀원**: 이민, 장호진, 홍필진, 김창수
><h2>목차</h2>
<h3>1.프로젝트 소개</h3>
<ul>
 <li>기획 의도</li>
 <li>목표</li>
</ul>
<h3>2. 개발 환경</h3>
<ul>
 <li>언어</li>
 <li>개발 툴</li>
 <li>프레임워크 및 라이브러리</li>
 <li>API</li>
</ul>
<h3>3. 주요 기능</h3>
<h3>4. 화면 및 코드 리뷰</h3>
<h3>5. 프로젝트 소감 및 향후 계획</h3>
<ul>
 <li>소감</li>
 <li>문제 해결 사례</li>
 <li>향후 계획</li>
</ul>

>## 1. 프로젝트 소개 
>### 기획 의도 
- 사용자에게 간편한 중고차구매,차량용품구매,렌트카 활용을 서비스

>### 목표 
- 다양한 자동차 관련 서비스를 통합한 웹 플랫폼을 구축함으로써, 사용자에게 편리하고 직관적인 차량 쇼핑 경험을 제공하고자 했습니다.
중고차 구매, 렌트카 예약, 차량 용품 구매를 하나의 사이트에서 해결할 수 있도록 설계하였고, 실제 서비스에 가까운 기능 구현을 통해 실무 감각을 키우는 것을 목표로 삼았습니다.
특히 저는 중고차 판매 페이지의 전반적인 기능을 담당하며, 차량 필터링, 상세 조회, 결제 및 관리자 관리 기능, 사용자와 상담사의 채팅까지 구현하며 프로젝트의 핵심 흐름을 이끌었습니다.

>## 2. 개발환경
>### 🔹 사용 언어
- **OS**: Windows
- **DB**: Oracle
- **FrontEnd**: HTML5 / CSS / JavaScript
- **BackEnd**: Java / Spring / MyBatis
- **Editor**: VS Code / Oracle SQL Developer
- **VCS**: GitHub
### 🔹 개발 툴
- Axios
- React
- React-DOM
- React-Router-DOM
- Redux
### 🔹 프레임워크 및 라이브러리
- @reduxjs/toolkit
- Axios
- Redux-Persist
- Lombok
- Oracle JDBC
- JWT
- Tomcat
- Spring WebSocket (STOMP,SockJS)
### 🔹 사용 API
- 카카오맵 API (지도 및 위치 정보 제공)
## 3. 주요 기능
### 🔹 **홍필진**
- 중고차 페이지: 상품 목록, 상태 필터링, 페이징 기능 구현
  
- 중고차 상세 페이지: 차량 상세 정보 출력, 차량 설명용 에디터, 결제 기능 포함
  
- 결제 기능: 결제 완료 시 상품 숨김 처리, 트랜잭션 관리, 결제 내역 저장
  
- 중고차 관리자 페이지: 차량 데이터 삽입·수정·삭제·조회, 키워드 검색
  
- 전국 직영점 기능: 지역별 차량 조회 및 카카오 지도 API 활용
  
- ChatBot 기능: 지역 기반 차량 조회, 차량 상세정보 조회 지원
  
- 상담 채팅 기능: 실시간 사용자-상담사 채팅, 채팅방 목록 조회 (상태: 수락, 거절, 대기), 상태별 필터링, 페이징 처리, 상담 처리 관리자 이름으로 검색 가능
  
## 🔍 설계의 주안점
- 프론트엔드에서 React를 활용하여 유지보수가 용이한 구조로 개발
- Base64를 사용한 이미지 저장 방식 적용
- 포인트 충전을 통한 사이트 내 구매 편의 제공
- TipTap Editor 활용
- Kakao Map API를 사용한 위치 정보 제공
- WebSocket 기반 실시간 채팅 서비스 구현

>## 4. 화면 및 코드 리뷰
### 메인화면
###  관리자 대시보드 화면
![image](https://github.com/user-attachments/assets/0704629b-170d-4081-89e1-21f3299fe8b5)
- Front<br>
- [관리자 대시보드 - AdminDashboard.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/AdminDashboard.js)
  
### 관리자 차량 조회
![image](https://github.com/user-attachments/assets/cc4c0bff-5b8e-48ec-845b-88ba8d940628)
- Front<br>
 - [관리자 차량 목록 - AdminUsedCar.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/AdminUsedCar.js)
- Back<br> 
 - [관리자 차량 목록 컨트롤러 - AdminUsedCarController.java](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/AdminUsedCarController.java)



### 차량 관리자 목록열고 차량명만 넣고 검색했을때 화면
 ![image](https://github.com/user-attachments/assets/36cf74b0-003b-4c3d-b50b-0eaa4aad611f)
- SQL
```  
	<!--ADMIN 중고차목록에서 차량이름,차량번호로 검색 -->
   <select id="searchUsedCars" resultType="com.rental.dto.UsedCarDTO">
    SELECT * 
    FROM used_car
    WHERE 1=1
    <if test="vehicleName != null and vehicleName != ''">
        AND vehicle_name LIKE CONCAT(#{vehicleName}, '%') 
    </if>
    <if test="vehicleNo != null and vehicleNo != ''">
        AND vehicle_no LIKE CONCAT(#{vehicleNo}, '%')
    </if>
   </select>
   ```
### 차량 관리자 목록열고 차량명 , 차량번호 둘다 입력 후 검색했을때
 ![image](https://github.com/user-attachments/assets/5e3cfc92-4e68-4865-8f7f-a9c973e86ae0)




### 차량 관리자 새 차량 등록  
![image](https://raw.githubusercontent.com/Hongpiljin/Project/main/img/admin_add_car.png)
- Front<br>
	- [관리자 차량 등록 화면 Front - AdminUsedCarAdd.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/AdminUsedCarAdd.js)
- Back<br>
	- [관리자 차량 등록 화면 Back  - AdminUsedCarController.java](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/AdminUsedCarController.java)
- SQL
```
 <insert id="insertUsedCar" parameterType="com.rental.dto.UsedCarDTO">
        INSERT INTO USED_CAR
        (
            VEHICLE_NO,
            VEHICLE_NAME,
            DEALER_NO,
            VEHICLE_TYPE,
            BRAND,
            MODEL_YEAR,
            PRICE,
            COLOR,
            DEALER_LOCATION,
            FUEL_TYPE,
            TRANSMISSION,
            DRIVE_TYPE,
            MAIN_IMAGE,
            VEHICLE_PLATE,
            CAR_KM,
            SEATING_CAPACITY,
            DESCRIPTION
        )
        VALUES
        (
            #{vehicleNo, jdbcType=VARCHAR},
            #{vehicleName, jdbcType=VARCHAR},
            #{dealerNo, jdbcType=INTEGER},
            #{vehicleType, jdbcType=VARCHAR},
            #{brand, jdbcType=VARCHAR},
            #{modelYear, jdbcType=INTEGER},
            #{price, jdbcType=INTEGER},
            #{color, jdbcType=VARCHAR},
            #{dealerLocation, jdbcType=VARCHAR},
            #{fuelType, jdbcType=VARCHAR},
            #{transmission, jdbcType=VARCHAR},
            #{driveType, jdbcType=VARCHAR},
            #{mainImage, jdbcType=BLOB},
            #{vehiclePlate, jdbcType=VARCHAR},
            #{carKm, jdbcType=INTEGER},
            #{seatingCapacity, jdbcType=INTEGER},
            #{description, jdbcType=VARCHAR}
        )
    </insert>
차량 추가 후
    <update id="updateMainImage">
        UPDATE USED_CAR
           SET MAIN_IMAGE = #{mainImage, jdbcType=BLOB}
         WHERE VEHICLE_NO = #{vehicleNo}
    </update>

<insert id="insertUsedCarImage" parameterType="com.rental.dto.UsedCarImageDTO">
    INSERT INTO USED_CAR_IMAGE (IMAGE_ID, VEHICLE_NO, IMAGE_DATA)
    VALUES (
      USED_CAR_IMAGE_SEQ.NEXTVAL,
      #{vehicleNo, jdbcType=VARCHAR},
      #{imageData, jdbcType=BLOB}
    )
</insert>
```

 ### 차량 게시판 화면 
 ![image](https://github.com/user-attachments/assets/42b1f42c-661a-48f4-85d9-d8fb73e5a04c)
- Front<br>
	- [차량 게시판 화면 Front - usedCarBoard.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/usedCarBoard.js)
- Back<br>
	- [차량 게시판 화면 Back  - UsedCarController.java](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
- SQL
```
<select id="getFilteredUsedCars" parameterType="map" resultMap="UsedCarResultMap">
    SELECT UC.*, UCI.IMAGE_ID, UCI.IMAGE_DATA, UCI.MAIN_IMAGE_STATUS
    FROM USED_CAR UC
    LEFT JOIN USED_CAR_IMAGE UCI ON UC.VEHICLE_NO = UCI.VEHICLE_NO
    WHERE UC.STATUS = 0
    AND UC.VEHICLE_NO IN (
        SELECT vehicle_no
        FROM (
            SELECT DISTINCT VEHICLE_NO, ROW_NUMBER() OVER (
                ORDER BY 
                CASE 
                    WHEN #{sortBy} = 'car_km' THEN CAR_KM
                    WHEN #{sortBy} = 'price' THEN PRICE
                    WHEN #{sortBy} = 'model_year' THEN MODEL_YEAR
                END 
                <choose>
                    <when test="order == 'asc'">ASC</when>
                    <otherwise>DESC</otherwise>
                </choose>
            ) AS rn
            FROM USED_CAR
            WHERE STATUS = 0
            AND 1 = 1
            <if test="vehicleName != null and vehicleName != ''"> AND LOWER(VEHICLE_NAME) LIKE LOWER(#{vehicleName}) || '%' </if>
            <if test="vehicleType != null and vehicleType != ''"> AND VEHICLE_TYPE = #{vehicleType} </if>
            <if test="brand != null and brand != ''"> AND BRAND = #{brand} </if>
            <if test="modelYear != null"> AND MODEL_YEAR = #{modelYear} </if>
            <if test="minPrice != null"> AND PRICE &gt;= #{minPrice} </if>
            <if test="maxPrice != null"> AND PRICE &lt;= #{maxPrice} </if>
            <if test="color != null and color != ''"> AND COLOR = #{color} </if>
            <if test="dealerLocation != null and dealerLocation != ''"> AND DEALER_LOCATION = #{dealerLocation} </if>
            <if test="fuelType != null and fuelType.trim() != ''"> AND LOWER(FUEL_TYPE) = LOWER(#{fuelType}) </if>
            <if test="transmission != null and transmission != ''"> AND TRANSMISSION = #{transmission} </if>
            <if test="driveType != null and driveType != ''"> AND DRIVE_TYPE = #{driveType} </if>
            <if test="minKm != null"> AND CAR_KM &gt;= #{minKm} </if>
            <if test="maxKm != null"> AND CAR_KM &lt;= #{maxKm} </if>
            <if test="seatingCapacity != null"> AND SEATING_CAPACITY = #{seatingCapacity} </if>
        )
        WHERE rn > #{offset} AND rn <= #{offset} + #{itemsPerPage}
    )
    ORDER BY 
    CASE 
        WHEN #{sortBy} = 'car_km' THEN UC.CAR_KM
        WHEN #{sortBy} = 'price' THEN UC.PRICE
        WHEN #{sortBy} = 'model_year' THEN UC.MODEL_YEAR
    END 
    <choose>
        <when test="order == 'asc'">ASC</when>
        <otherwise>DESC</otherwise>
    </choose>,
    UCI.IMAGE_ID ASC
</select>


<select id="getFilteredUsedCarsCount" parameterType="map" resultType="int">
    SELECT COUNT(DISTINCT UC.VEHICLE_NO)
    FROM USED_CAR UC
    LEFT JOIN USED_CAR_IMAGE UCI ON UC.VEHICLE_NO = UCI.VEHICLE_NO
    WHERE UC.STATUS = 0
    AND 1=1
    <if test="vehicleName != null and vehicleName != ''"> AND LOWER(UC.VEHICLE_NAME) LIKE LOWER(#{vehicleName}) || '%' </if>
    <if test="vehicleType != null and vehicleType != ''"> AND UC.VEHICLE_TYPE = #{vehicleType} </if>
    <if test="brand != null and brand != ''"> AND UC.BRAND = #{brand} </if>
    <if test="modelYear != null"> AND UC.MODEL_YEAR = #{modelYear} </if>
    <if test="minPrice != null"> AND UC.PRICE &gt;= #{minPrice} </if>
    <if test="maxPrice != null"> AND UC.PRICE &lt;= #{maxPrice} </if>
    <if test="color != null and color != ''"> AND UC.COLOR = #{color} </if>
    <if test="dealerLocation != null and dealerLocation != ''"> AND UC.DEALER_LOCATION = #{dealerLocation} </if>
    <if test="fuelType != null and fuelType.trim() != ''"> AND LOWER(UC.FUEL_TYPE) = LOWER(#{fuelType}) </if>
    <if test="transmission != null and transmission != ''"> AND UC.TRANSMISSION = #{transmission} </if>
    <if test="driveType != null and driveType != ''"> AND UC.DRIVE_TYPE = #{driveType} </if>
    <if test="minKm != null"> AND UC.CAR_KM &gt;= #{minKm} </if>
    <if test="maxKm != null"> AND UC.CAR_KM &lt;= #{maxKm} </if>
    <if test="seatingCapacity != null"> AND UC.SEATING_CAPACITY = #{seatingCapacity} </if>
</select>
```
 ### 차량 게시판에서 특정차량 검색 필터 기본값 적은 주행거리순 !
![image](https://github.com/user-attachments/assets/6c0aaa17-0072-4bdf-af6f-5aa8cc827dff)
- Front<br>
	-[차량 게시판 필터 적용 Front - AdminUsedCar.js ](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/AdminUsedCar.js)
- Back<br>
	-[차량 게시판 필터 적용 Back  - UsedCarController.java / @GetMapping("/getFilteredUsedCars")] - (https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
- SQL 
```
  <select id="getFilteredUsedCars" parameterType="map" resultMap="UsedCarResultMap"> SELECT UC.*,
    UCI.IMAGE_ID, UCI.IMAGE_DATA, UCI.MAIN_IMAGE_STATUS FROM USED_CAR UC LEFT JOIN USED_CAR_IMAGE
    UCI ON UC.VEHICLE_NO = UCI.VEHICLE_NO WHERE UC.STATUS = 0 AND UC.VEHICLE_NO IN ( SELECT
    vehicle_no FROM ( SELECT DISTINCT VEHICLE_NO, ROW_NUMBER() OVER ( ORDER BY CASE WHEN #{sortBy} =
    'car_km' THEN CAR_KM WHEN #{sortBy} = 'price' THEN PRICE WHEN #{sortBy} = 'model_year' THEN
    MODEL_YEAR END <choose>
      <when test="order == 'asc'">ASC</when>
      <otherwise>DESC</otherwise>
    </choose> ) AS rn FROM USED_CAR WHERE STATUS = 0 AND 1 = 1 <if
      test="vehicleName != null and vehicleName != ''"> AND LOWER(VEHICLE_NAME) LIKE
    LOWER(#{vehicleName}) || '%' </if>
                <if test="vehicleType != null and vehicleType != ''"> AND
    VEHICLE_TYPE = #{vehicleType} </if>
                <if test="brand != null and brand != ''"> AND BRAND =
    #{brand} </if>
                <if test="modelYear != null"> AND MODEL_YEAR = #{modelYear} </if>
                <if
      test="minPrice != null"> AND PRICE &gt;= #{minPrice} </if>
                <if test="maxPrice != null"> AND
    PRICE &lt;= #{maxPrice} </if>
                <if test="color != null and color != ''"> AND COLOR = #{color} </if>
                <if
      test="dealerLocation != null and dealerLocation != ''"> AND DEALER_LOCATION =
    #{dealerLocation} </if>
                <if test="fuelType != null and fuelType.trim() != ''"> AND
    LOWER(FUEL_TYPE) = LOWER(#{fuelType}) </if>
                <if
      test="transmission != null and transmission != ''"> AND TRANSMISSION = #{transmission} </if>
                <if
      test="driveType != null and driveType != ''"> AND DRIVE_TYPE = #{driveType} </if>
                <if
      test="minKm != null"> AND CAR_KM &gt;= #{minKm} </if>
                <if test="maxKm != null"> AND CAR_KM
    &lt;= #{maxKm} </if>
                <if test="seatingCapacity != null"> AND SEATING_CAPACITY =
    #{seatingCapacity} </if> ) WHERE rn &gt; #{offset} AND rn &lt;= #{offset} + #{itemsPerPage} )
    ORDER BY CASE WHEN #{sortBy} = 'car_km' THEN UC.CAR_KM WHEN #{sortBy} = 'price' THEN UC.PRICE
    WHEN #{sortBy} = 'model_year' THEN UC.MODEL_YEAR END <choose>
      <when test="order == 'asc'">ASC</when>
      <otherwise>DESC</otherwise>
    </choose>, UCI.IMAGE_ID ASC </select>
```
 ### 차량 게시판에서 특정 차량 검색 필터 낮은가격순 , 카테고리 변경 
 ![image](https://github.com/user-attachments/assets/900325d3-c610-4e50-abf3-ba37624ae692)
- Front<br>
	-[차량 게시판 필터 적용 Front - AdminUsedCar.js ](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/AdminUsedCar.js)
- Back<br>
	-[차량 게시판 필터 적용 Back  - UsedCarController.java / @GetMapping("/getFilteredUsedCars")] - (https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
- SQL
```
SQL문 위와 같음
```
 ###  차량 상세페이지 
 ![image](https://github.com/user-attachments/assets/37726014-7929-4969-b380-1aa7e6b32c86)
- Front<br>
	- [차량 상세 페이지 Front - CarDetail.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/CarDetail.js)
- Back<br>
	- [차량 상세 페이지 Back  -  @GetMapping("/detail")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
	- SQL
```
  <select id="findByVehicleNo" parameterType="String" resultMap="UsedCarResultMap"> SELECT UC.*,
    UCI.IMAGE_ID, UCI.IMAGE_DATA, UCI.MAIN_IMAGE_STATUS FROM USED_CAR UC LEFT JOIN USED_CAR_IMAGE
    UCI ON UC.VEHICLE_NO = UCI.VEHICLE_NO WHERE UC.VEHICLE_NO = #{vehicleNo} AND UC.STATUS = 0 ORDER
    BY UCI.IMAGE_ID ASC </select>
```
 ###  차량 결제정보 페이지 이동 
 ![image](https://github.com/user-attachments/assets/3b5943e0-4e05-4f2a-bdd4-e2315efaa32a)
- Front<br>
	- [차량 결제정보 페이지 이동 Front - CarPaymentdetaile.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/CarPaymentdetaile.js)
- Back<br>
	- [유저 포인트 , 유저 정보 조회 Back -  @GetMapping("/point"), @GetMapping("/user/info")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
- SQL
```
 <!-- 사용자 전체 정보 조회 (포인트 포함) -->
  <select id="findUserById" parameterType="String" resultType="com.rental.dto.UserDTO"> SELECT
    USER_NO, NAME, EMAIL, PHONE, POINT, USER_ID, ADDRESS FROM users WHERE USER_ID = #{userId} </select>
```
 ### 차량 결제정보 상세페이지로 이동
 ![image](https://github.com/user-attachments/assets/91733cae-0b0d-4620-886f-77731c5c597c)
- Front<br>
	- [차량 결제정보 상세페이지 Front - CarPayment.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/CarPayment.js)
- Back<br>
	- [차량 결제정보 상세페이지 Back  -  @PostMapping("/payment")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/UsedCarController.java)
- SQL
```
 <!-- 결제 상세 INSERT -->
  <insert id="insertUsedCarPaymentDetail" parameterType="com.rental.dto.UsedCarpaymentDetailDTO">
    INSERT INTO USED_CAR_PAYMENT_DETAIL (VEHICLE_NO, PAYMENT_NO, PAYMENT_DATE, PAYMENT_AMOUNT,
    user_no) VALUES (#{vehicleNo}, #{paymentNo}, #{paymentDate}, #{paymentAmount}, #{userNo}) </insert>

  <!--  사용자 포인트 차감 -->
    <update id="updateUserPoint">
        UPDATE users 
        SET point = #{newPoint} 
        WHERE user_no = #{userNo}
    </update>

  <!-- 소프트 딜리트 (차량 상태 변경) -->
  <update id="softDeleteUsedCar" parameterType="string"> UPDATE USED_CAR SET STATUS = 1 WHERE
    VEHICLE_NO = #{vehicleNo} </update>

```
 ### 전국 직영점 첫 페이지 
 ![image](https://github.com/user-attachments/assets/8198935d-f6bd-4de3-b3db-3fb78be2a4ed)
- Front<br>
	- [전국 직영점 페이지 Front - DealerLocationList.js ](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/DealerLocationList.js)
- Back<br>
	- [전국 직영점 페이지 Back  - DealerLocationController.java](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/DealerLocationController.java)
- SQL
```
<!-- 중복되지 않는 판매점 조회 -->
<select id="findDistinctDealerLocations" resultType="com.rental.dto.UsedCarDTO">
    SELECT DISTINCT dealer_location AS dealerLocation
    FROM used_car
</select>
```
 ### 전국 직영점 지역선택 후 화면
![image](https://github.com/user-attachments/assets/273c20c8-3677-4b43-89c4-59455f09e17c)특정차량 클릭시 해당차량 상세페이지로 다이렉트 이동
- Front<br>
	- [전국 직영점 상세페이지 Front - CarsByLocation.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/page/CarsByLocation.js)
- Back<br>
	- [전국 직영점 상세페이지 Back  -  @GetMapping("/{location}")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/DealerLocationController.java)
	- SQL
```
<select id="findCarsByLocation"
        parameterType="String"
        resultType="com.rental.dto.UsedCarDTO">
    SELECT ... FROM used_car WHERE dealer_location = #{location}
</select>
```
 ### 챗봇 
 ![image](https://github.com/user-attachments/assets/450a3b8c-e71b-40ea-836a-29737e1e3fb1)특정지역 차량목록 출력
- Front<br>
	- [챗봇 특정지역 차량목록 출력 Front - Chatbot.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/components/Chatbot.js)
- Back<br>
	- [챗봇 특정지역 차량목록 출력 Back  - ChatBotController.java /  @PostMapping("/webhook")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/ChatBotController.java)
- SQL
```
    <!--  지역별 차량 목록 조회 -->
    <select id="findByDealerLocation" parameterType="string" resultType="com.rental.dto.UsedCarDTO">
        SELECT 
            vehicle_no AS vehicleNo,
            vehicle_name AS vehicleName,
            dealer_no AS dealerNo,
            vehicle_type AS vehicleType,
            brand,
            model_year AS modelYear,
            price,
            color,
            dealer_location AS dealerLocation,
            fuel_type AS fuelType,
            transmission,
            drive_type AS driveType,
            main_image AS mainImage,
            vehicle_plate AS vehiclePlate,
            car_km AS carKm,
            seating_capacity AS seatingCapacity,
            description,
            status
        FROM used_car
        WHERE dealer_location = #{dealerLocation}
    </select>
```
 ### 챗봇 
 ![image](https://github.com/user-attachments/assets/cfee6c49-e196-4df4-8d09-4da3084f3257)특정 차량번호 정보 출력
- Front<br>
	- [챗봇 특정 차량번호 정보 출력 Front - Chatbot.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/components/Chatbot.js)
- Back<br>
	- [챗봇 특정 차량번호 정보 출력 Back  - Back  - ChatBotController.java /  @PostMapping("/webhook")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/ChatBotController.java)
	- SQL
```
<!-- 차량번호(vehicleNo)로 상세 조회 -->
<select id="findByVehiclePlate" parameterType="java.lang.String" resultType="com.rental.dto.UsedCarDTO">
    SELECT 
        vehicle_no AS vehicleNo,
        vehicle_name AS vehicleName,
        dealer_no AS dealerNo,
        vehicle_type AS vehicleType,
        brand,
        model_year AS modelYear,
        price,
        color,
        dealer_location AS dealerLocation,
        fuel_type AS fuelType,
        transmission,
        drive_type AS driveType,
        main_image AS mainImage,
        vehicle_plate AS vehiclePlate,
        car_km AS carKm,
        seating_capacity AS seatingCapacity,
        description,
        status
    FROM used_car
    WHERE vehicle_plate = #{vehiclePlate}
</select>
```
### 챗봇 채팅 
![image](https://github.com/user-attachments/assets/4640d234-0ed4-4483-bf4d-26ec1766fbea)( 사용자 시점 ) 
![image](https://github.com/user-attachments/assets/88d3d371-3eca-41f4-b163-8c2990a5bca3)( 상담사 시점 )

- Front<br>
	- [챗봇 채팅 Front - Chatbot.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/components/Chatbot.js)
- Back<br>
	- [챗봇 채팅 Back  - ChatController.java /  @MessageMapping("/chat.sendMessage")](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/ChatController.java)
- WebSocket<br>
	- [ WebSocket - WebSocketConfig.java](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/config/WebSocketConfig.java)
  	- SQL
```
  <!-- 채팅방 생성: 새로운 채팅방 정보를 DB에 삽입 -->
  <insert id="insertChatRoom" parameterType="com.rental.dto.ChatRoomDTO">
   INSERT INTO chat_room (room_id, user_no, admin_no, status, created_at)
   VALUES (#{roomId}, #{userNo}, #{adminNo, jdbcType=INTEGER}, #{status}, #{createdAt})
  </insert>


 <!-- 채팅 메시지 저장: 전달받은 메시지를 CHAT_MESSAGE 테이블에 삽입 -->
 <insert id="insertChatMessage" parameterType="com.rental.dto.ChatMessageDTO">
  INSERT INTO CHAT_MESSAGE (message_id, room_id, sender_id, message, sent_at)
  VALUES (CHAT_MESSAGE_SEQ.NEXTVAL, #{roomId}, #{senderId}, #{message}, #{sentAt})
</insert>

  <!-- 채팅방 종료: 채팅방 상태를 'closed'로 변경하고 종료 시간을 기록 -->
  <update id="updateRoomStatusToClosed">
    UPDATE chat_room
    SET status = 'closed',
        closed_at = #{closedAt}
    WHERE room_id = #{roomId}
  </update>

```
### 상담원 전용 채팅 페이지 
![image](https://github.com/user-attachments/assets/c2f496c6-e182-40d3-a110-8d10b1c69c00)상담원 전용 채팅목록 페이지 (수락,거절,대기중) 
- Front<br>
	- [상담원 전용 페이지 Front - AgentChatList.js](https://github.com/Hongpiljin/Project/blob/KH_final_project/Front/src/components/AgentChatList.js)
- Back<br>
	- [상담원 전용 페이지 Back  - ChatController.java / chat/accept , chat/reject , chat/close , chat/select api 사용](https://github.com/Hongpiljin/Project/blob/KH_final_project/Back/src/main/java/com/rental/controller/ChatController.java)
  	- SQL
```
  <!-- 채팅방 수락: 상담원이 배정되면서 채팅방 상태를 'active'로 변경 -->
<update id="updateRoomStatusToActive" parameterType="map">
    UPDATE CHAT_ROOM
    SET 
        admin_no = #{consultantId},
        admin_name = #{adminName},
        status = 'active',
        accepted_at = #{acceptedAt}
    WHERE room_id = #{roomId}
</update>

  <!-- 채팅방 거절: 채팅방 상태를 'rejected'로 변경하며 종료 시간을 기록 -->
  <update id="updateRoomStatusToRejected">
    UPDATE chat_room
    SET status = 'rejected',
        closed_at = #{rejectedAt}
    WHERE room_id = #{roomId}
  </update>

<!--  상담원 리스트 : adminName , status 필터링 -->
<select id="selectChatRooms" resultType="com.rental.dto.ChatRoomDTO">
  SELECT room_id, user_no, admin_no, status, created_at, closed_at, admin_name
  FROM chat_room
  <where>
    <if test="adminName != null and adminName != ''">
      admin_name LIKE '%' || #{adminName} || '%'
    </if>
    <if test="status != null and status != ''">
      <if test="adminName != null and adminName != ''">AND</if>
      status = #{status}
    </if>
  </where>
  ORDER BY created_at DESC
</select>
```
## 5. 프로젝트 소감 및 향후 계획

### 소감

파이널 프로젝트를 마무리하며, 팀원들과 함께 하나의 완성된 웹 서비스를 구현했다는 점에서 큰 성취감을 느꼈습니다. 처음에는 주제 선정과 기능 구성부터 많은 고민이 있었지만, 이전 프로젝트에서 경험한 필터링, 페이징, 검색 기능 등을 토대로 보다 수월하게 진행할 수 있었습니다.
이번 프로젝트에서는 단순히 기능 구현에 그치지 않고, 실제 사용자 경험과 개발자 입장에서의 고민을 동시에 고려하여 개발하려고 노력했습니다. 예를 들어, 중고차 이미지 저장 방식에 대해 처음에는 AWS 서버를 이용한 외부 저장을 검토했지만, 비용 문제와 관리 이슈를 고려해 Base64 방식으로 DB에 BLOB 형태로 저장하는 방식으로 구조를 변경하였습니다. 이 과정을 통해 기술 선택에 있어 실용성과 비용 효율성까지 함께 고려하는 중요한 경험을 할 수 있었습니다.
또한, WebSocket을 활용한 실시간 1:1 상담 채팅 기능을 직접 구현하며 서버와 클라이언트 간 실시간 통신 구조에 대한 이해를 높일 수 있었습니다. 설정과 테스트 과정에서 많은 시행착오를 겪었지만, 그만큼 큰 성장을 이뤘다고 생각합니다.
이러한 경험을 바탕으로, 이제는 단순히 ‘작동하는 프로그램’을 넘어서 ‘사용자 중심의 서비스’를 설계하고, 다양한 기술 스택을 적재적소에 적용하는 개발자가 되고자 합니다. 앞으로도 꾸준히 역량을 키우며, 실무에서도 적극적으로 문제를 해결하고 개선점을 찾아내는 개발자가 되겠습니다.

### 문제 해결 사례

---

🚫 **차량 옵션 정보 API 활용 실패**  
**문제**: 차량 상세 정보를 제공하기 위해 외부 API를 탐색했으나, 대부분의 API가 **차대번호(VIN)**를 요구함.  
**제약 사항**: 차대번호는 국가 기관에서 관리하며, 프로젝트에서 임의로 생성하거나 사용할 수 없음.  
**해결**: 외부 API 사용은 포기하고, 자체 등록한 차량 옵션 설명 데이터를 기반으로 사용자에게 정보를 제공하는 방식으로 설계를 수정함.

---

🖼 **이미지 렌더링 속도 지연**  
**문제**: 관리자 페이지와 중고차 메인 페이지에서 차량 이미지를 한 번에 렌더링하면서, 화면 진입 시 딜레이가 심하게 발생함.  
**해결**: 페이징 처리를 통해 각 페이지마다 필요한 이미지 부분만 렌더링하도록 개선.  
결과적으로 페이지 로딩 속도가 크게 향상되고 사용자 경험이 개선됨.

---

💬 **챗봇 기능 설계의 제한**  
**문제**: 초기에 카카오 챗봇 API를 통해 고객센터와 연동된 챗봇을 구현하려 했으나,  
- 비즈니스 도메인이 없고  
- 정식 사업자 계정이 없어 인증 및 등록 실패  

**해결**: 외부 챗봇 연동은 생략하고, 직접 설계한 API를 사용해  
- 지역 기반 차량 검색  
- 고객센터 문의  
등의 기능을 자체 챗봇 형태로 구현함.

**아쉬운 점**: 당시 ChatGPT 등 AI 기술을 활용한 연동을 고려하지 못한 점이 아쉬움.  
이후 1인 중고마켓 프로젝트에서는 이를 반영해 개선함.

---

🏢 **가맹점 정보 기능 구현의 한계**  
**문제**: 고객센터 담당 팀원이 먼저 수료하면서 해당 기능이 미완성 상태로 남았고, 렌트카 기능도 발표일까지 완료되지 못함. 이에 따라 부족해 보일 수 있는 부분을 보완하기 위해 급히 ‘가맹점’ 탭을 추가함.  
하지만 사전 설계된 기능이 아니었고, 별도 DB 테이블도 구성되지 않아 기존 구조와 연동되지 못함.

**해결**:  
- 서울, 경기, 부산 등 주요 지역의 가맹점 좌표를 고정으로 설정  
- 해당 지역 차량만 간단히 연동하여 지도에 표시하는 방식으로 기능 구현  
- 검색 및 동적 필터링 기능은 미포함되었음

**아쉬운 점**:  
- 시간이 2~3일만 더 있었다면  
  - 가맹점 테이블을 생성하고  
  - 차량과 연관된 부모-자식 관계로 매핑하여  
  더 높은 완성도를 구현할 수 있었음  
- 해당 경험을 통해 **기획 단계의 설계와 기능 유연성 확보의 중요성**을 체감함
 
