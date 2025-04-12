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
 <li>향후 계획</li>
</ul>

>## 1. 프로젝트 소개 
>### 기획 의도 
- 사용자에게 간편한 중고차구매,차량용품구매,렌트카 활용을 서비스

>### 목표 
- ?? 

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
### 🔹 사용 API
- 카카오맵 API (지도 및 위치 정보 제공)
## 3. 주요 기능
### 🔹 **홍필진**
- 중고차 페이지 (상품 목록 & 필터링 & 페이징)
- 중고차 상세 페이지 (상품 상세 정보 표시, 차량 설명 에디터, 결제 기능)
- 결제 기능 (차량 결제 완료 시 숨김 처리, 트랜잭션 관리, 결제 내역 저장)
- 중고차 관리자 (데이터 삽입, 수정, 삭제, 조회, 검색)
- 전국 직영점 (각 매장 지역별 차량 조회, 지도 API 활용)
- ChatBot ( 지역별 차량 조회, 차량 상세정보 조회)
## 🔍 설계의 주안점
- 카카오 로그인을 포함한 간편 로그인 기능 지원
- JWT 기반의 인증 및 인가 시스템 적용
- 프론트엔드에서 React를 활용하여 유지보수가 용이한 구조로 개발
- Base64를 사용한 이미지 저장 방식 적용
- LocalStorage를 이용한 장바구니 데이터 저장
- 포인트 충전을 통한 사이트 내 구매 편의 제공
- TipTap Editor 활용
- Kakao Map API를 사용한 위치 정보 제공

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
SQL 입력
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
	- [챗봇 특정지역 차량목록 출력 Front](입력)
- Back<br>
	- [챗봇 특정지역 차량목록 출력 Back](입력)
- SQL
```
SQL 입력
```
 ### 챗봇 
 ![image](https://github.com/user-attachments/assets/cfee6c49-e196-4df4-8d09-4da3084f3257)특정 차량번호 정보 출력
- Front<br>
	- [챗봇 특정 차량번호 정보 출력 Front](입력)
- Back<br>
	- [챗봇 특정 차량번호 정보 출력 Back](입력)
	- SQL
```
SQL 입력
```
### 챗봇 채팅 
![image](https://github.com/user-attachments/assets/4640d234-0ed4-4483-bf4d-26ec1766fbea)( 사용자 시점 ) 
![image](https://github.com/user-attachments/assets/88d3d371-3eca-41f4-b163-8c2990a5bca3)( 상담사 시점 )

- Front<br>
	- [챗봇 채팅 Front](입력)
- Back<br>
	- [챗봇 채팅 Back](입력)
  	- SQL
```
SQL 입력
```
### 상담원 전용 채팅 페이지 
![image](https://github.com/user-attachments/assets/39940e6f-b48d-40ce-a94c-26d064a5069d) 상담원 전용 채팅목록 페이지 (수락,거절,대기) 
- Front<br>
	- [상담원 전용 페이지 Front](입력)
- Back<br>
	- [상담원 전용 페이지 Back](입력)
  	- SQL
```
SQL 입력
```
