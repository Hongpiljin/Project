# 📁 KH 포트폴리오 프로젝트

이 저장소는 KH정보교육원에서 진행한 팀 프로젝트입니다.  
총 2개의 프로젝트를 수행했으며, 아래와 같이 구성되어 있습니다.
---

># KH2조 Semi_Project
>## 팀 소개

>### 1. 팀 이름
KH 2조  

>### 2. 팀원
- 팀장: 이현성  
- 팀원:
  - 최승인  
  - 이형준  
  - 홍필진  
  - 장호진

><h2>목차</h2>
<h3>1. 프로젝트 소개</h3>
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
<h3>3. 개발 일정</h3>
<h3>4. 주요 기능</h3>
<h3>5. 화면 및 코드 리뷰</h3>
<h3>6. 프로젝트 소감 및 향후 계획</h3>
<ul>
  <li>소감</li>
  <li>향후 계획</li>
</ul>
<h3>7. Q & A</h3>

>## 1. 프로젝트 소개
>### 기획 의도
- 사용자에게 국내 관광지 소개
- 게시판을 통해 여행 관련 정보 공유

>### 목표
- 국내 여행 욕구 증가
- 다양한 여행 정보 공유
- 국내 관광지 활성화
  
>## 2. 개발 환경
>### 사용 언어
- Front End
  - JSP
  - CSS
  - Javascript
- Back End
  - Java   
>### 개발 툴
- Eclipse
- Oracle Database 11 XE
- DBeaver
- Tomcat 10
>### 프레임워크 및 라이브러리
- MyBatis
- Jakarta El
- Jakarta JSP & JSTL
- Toast UI Editor
- BCrypt (비밀번호 암호화)
- JSON
>### 사용 API
- 카카오맵 API (지도 및 위치 정보 제공)

>## 3. 개발 일정
| 기간           | 작업 내용                 |
|----------------|--------------------------|
| 11/28          | 주제 선정                |
| 11/29 ~ 12/02   | 개발 기획 및 DB 설계     |
| 12/03 ~ 12/05    | UI 설계                  |
| 12/06 ~ 12/22   | 기능 구현                |
| 12/23          | 프로젝트 발표            |

>## 4. 주요 기능
>### 메인화면(담당자 : 장호진)
>### 로그인 페이지(담당자 : 이형준, 장호진)
- 로그인 기능(이형준)
- 아이디 찾기(장호진)
- 비밀번호 찾기 (장호진)
>### 회원가입 페이지(담당자 : 장호진)
- 회원가입 DB저장
- 비밀번호 검증 기능
- 해쉬값으로 변화 후 DB 저장
- 아이디, 이메일, 닉네임 중복 확인
>### 마이 페이지(담당자 : 이형준)
- 프로필 사진 등록, 수정, 삭제
- 정보 수정
>### 관리자 기능(홍필진, 최승인)
- 회원 전체 조회 및 삭제(홍필진)
- 게시글 신고 목록 조회 및 검색처리(홍필진)
- 댓글 신고 목록 조회 및 처리(최승인)
>### 지역소개(담당자 : 이현성)
- 지역소개 작성, 수정, 삭제
- 이미지 업로드
- 카카오맵 API
>### 게시판(담당자 : 이현성, 최승인, 홍필진)
- 게시글 전체 조회(이현성, 최승인, 홍필진)
- 게시글 검색, 정렬 기능, 페이징(홍필진)
- 게시글 상세 조회(이현성, 최승인)
- 댓글 작성, 삭제(최승인)
- 게시글 작성, 수정, 삭제(최승인)
- 파일 업로드(최승인)
- 게시글 신고(홍필진), 댓글 신고(최승인)
- 게시글, 댓글 좋아요 기능(최승인)

>## 5. 화면 및 코드 리뷰
>### 메인화면
![image](https://github.com/user-attachments/assets/f157fdf8-ea28-4f9e-9e39-c69a0c22c994)

>### 로그인 화면
![image](https://github.com/user-attachments/assets/77cd7b6e-b013-4f79-9d60-74e992624ba0)
-Front<br>
	-[로그인 화면 - loginView.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/loginView.jsp)<br>
 
-Back<br>
	-[로그인 화면 이동 - LoginViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/LoginViewController.java)<br>
 	-[로그인 - LoginController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/LoginController.java)<br>
 	-[로그아웃 - LogoutController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/LoginController.java)<br>
  	
-SQL
```
	<select id="findUserByLoginId" parameterType="string" resultMap="users">
		SELECT
		user_number,
		login_id,
		nick_name,
		password,
		user_name,
		user_email,
		grade,
		profile_image_url
		FROM users
		WHERE login_id = #{loginId}
	</select>
```

>### 회원가입 화면
![image](https://github.com/user-attachments/assets/0f0eea02-0549-4206-a959-1a13ce8f0b67)
- FRONT <br>
    - [회원가입 - insertMember.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/insertMember.jsp)<br>
	- [회원가입성공 - IdInsertSuccessPage.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/IdInsertSuccessPage.jsp)<br>
	- [회원가입실패 - IdInsertErrorPage.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/IdInsertErrorPage.jsp)<br>

- BACK  <br> 
    - [회원가입 - InsertMember.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/InsertMember.java)<br>
	- [아이디 중복 처리 - CheckLoginIdController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CheckLoginIdController.java)<br>
	- [닉네임 중복 처리 - CheckNickNameController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CheckNickNameController.java)<br>
	- [이메일 중복 처리 - CheckEmailController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CheckEmailController.java)

- SQL
```
<!-- 아이디 중복 확인 -->
<select id="selectLoginIdCount" parameterType="string"
		resultType="int">
		SELECT COUNT(*)
		FROM users
		WHERE login_id = #{loginId}
	</select>

	<!-- 이메일 중복 확인 -->
	<select id="selectEmailCount" parameterType="string"
		resultType="int">
		SELECT COUNT(*)
		FROM users
		WHERE user_email = #{email}
	</select>

	<!-- 닉네임 중복 확인 -->
	<select id="selectNickNameCount" parameterType="string"
		resultType="int">
		SELECT COUNT(*)
		FROM users
		WHERE nick_name = #{nickName}
	</select>

<!-- 회원 가입 -->
	<insert id="insertMember" parameterType="dto.UsersDTO">
		INSERT INTO users (
		user_number,
		login_id,
		nick_name,
		password,
		create_time,
		update_time,
		pw_update_time,
		user_name,
		user_email,
		grade
		)
		VALUES (
		SEQ_USER_NUMBER.NEXTVAL,
		#{loginId, jdbcType=VARCHAR},
		#{nickName, jdbcType=VARCHAR},
		#{password, jdbcType=VARCHAR},
		#{createTime, jdbcType=TIMESTAMP},
		NULL, <!-- update_time -->
		NULL, <!-- pw_update_time -->
		#{userName, jdbcType=VARCHAR},
		#{userEmail, jdbcType=VARCHAR},
		DEFAULT
		)
	</insert>
```


>### 아이디 찾기
![image](https://github.com/user-attachments/assets/4622ea14-8da0-494f-8271-6e2c61072d51)
- FRONT <br> - [아이디 찾기 - findLoginId.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/findLoginId.jsp)

- BACK  <br> - [아이디 찾기 처리 - FindLoginIdController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/FindLoginIdController.java)
- SQL
```
<!-- 사용자 이름과 이메일을 기반으로 로그인 ID 찾기 -->
	<select id="findLoginIdByUserNameAndEmail" parameterType="map"
		resultType="string">
		SELECT login_id
		FROM users
		WHERE user_name = #{userName} AND
		user_email = #{userEmail}
	</select>
```


>### 비밀번호 찾기
![image](https://github.com/user-attachments/assets/0436a406-ebb0-49b3-8455-241e4d697f99)
- FRONT <br> - [비밀번호 찾기 처리 - PasswordRecovery.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/PasswordRecovery.jsp)

- BACK <br> - [비밀번호 찾기 처리 - PasswordRecoveryController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/PasswordRecoveryController.java)<br>  [비밀번호 찾기 후 처리 - PasswordUpdateController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/PasswordUpdateController.java)

- SQL
```
<!-- pw찾기 및  pw수정 -->
	<select id="findUserForPasswordReset" parameterType="map"
		resultType="dto.UsersDTO">
		SELECT user_number AS userNumber,
		login_id,
		user_name,
		user_email
		FROM users
		WHERE user_name = #{userName}
		AND login_id =
		#{loginId}
		AND user_email = #{userEmail}
	</select>

	<update id="updatePassword" parameterType="map">
		UPDATE users
		SET
		password = #{password}, pw_update_time = CURRENT_TIMESTAMP
		WHERE
		user_number = #{userNumber}
	</update>
```


>### 마이페이지 내정보
![image](https://github.com/user-attachments/assets/f857b35c-9fd2-48e1-b7cf-b969dc05915f)
-Front<br>
	-[마이페이지 - mypageView.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/mypageView.jsp)<br>
 	-[마이페이지 - mypageView.js](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/script/mypageView.js)<br>

-Back<br>
	-[내정보 조회 - MyPageViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/MyPageViewController.java)<br>

 -SQL
 ```
	<select id="findUserByUserNumber" parameterType="int"
		resultMap="users">
		SELECT
		user_number,
		login_id,
		nick_name,
		password,
		create_time,
		update_time,
		pw_update_time,
		user_name,
		user_email,
		grade,
		profile_image_url
		FROM users
		WHERE
		user_number = #{userNumber}
	</select>
 ```
>### 마이페이지 프로필(등록,삭제)
-Back<br>
	-[프로필Controller - ProfileImageController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/ProfileImageController.java)<br>
 	-[프로필Servlet - ProfileImageServlet.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/servlet/ProfileImageServlet.java)<br>
  
-SQL
```
    <!-- 사용자 번호를 기준으로 프로필 이미지 조회 -->
    <select id="getProfileImage" parameterType="int" resultType="string">
        SELECT profile_image_url
        FROM users
        WHERE user_number = #{userNumber}
    </select>

    <!-- 사용자 프로필 이미지 업데이트 -->
    <update id="updateProfileImage" parameterType="map">
        UPDATE users
        SET profile_image_url = #{fileName}
        WHERE user_number = #{userNumber}
    </update>
```

>### 정보수정
![image](https://github.com/user-attachments/assets/c5a98eb8-8158-417b-a845-4aa9a0eb20cd)
-Front<br>
	-[정보수정jsp - updateUserView.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/updateUserView.jsp)<br>
 	-[정보수정js - updateUserView.js](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/script/updateUserView.js)<br>
 
-Back<br>
	-[정보수정 이동 - UpdateUserViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/UpdateUserViewController.java)<br>
	-[닉네임,비밀번호,이메일 변경 - UpdateUserController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/UpdateUserController.java)<br>

-SQL
```
	<update id="updateUser" parameterType="dto.UsersDTO">
		UPDATE users
		<set>
			<!-- 닉네임 변경 -->
			<if test="nickName != null and nickName != ''">
				nick_name = #{nickName},
			</if>
			<!-- 이메일 변경 -->
			<if test="userEmail != null and userEmail != ''">
				user_email = #{userEmail},
			</if>
			<!-- 비밀번호 변경 -->
			<if test="password != null and password != ''">
				password = #{password},
				pw_update_time = SYSDATE,
			</if>
			<!-- 항상 업데이트되는 update_time -->
			update_time = SYSDATE
		</set>
		WHERE user_number = #{userNumber}
	</update>
```

>### 지역소개
![image](https://github.com/user-attachments/assets/e052593a-5813-4ffa-8a20-ad4e13ea9b9b)

- Front<br>
	- [지역소개 메인 화면 - region.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/region.jsp)<br>
- Back<br>
	- [지역 데이터 일부 조회 - RegionIntro.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/RegionIntro.java)

- SQL
```
<select id="selectAllRegion" resultMap="region">
		SELECT *
		FROM region
		ORDER
		BY region_number
		OFFSET #{offset} ROWS FETCH NEXT #{pageSize}
		ROWS ONLY
	</select>
```
>### 지역소개 상세 화면
![image](https://github.com/user-attachments/assets/90ebac6b-a0bf-422c-9c3a-f67356cccc76)

- Front<br>
	- [지역소개 상세 화면 - regionDetail.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/regionDetail.jsp)<br>
- Back<br>
	- [지역 데이터 상세 조회 - RegionDetail.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/RegionDetail.java)

- SQL
```
<select id="selectRegionByRegionNumber" resultMap="region">
		SELECT
		region_number,
		title,
		description,
		create_time,
		update_time,
		image_url,
		latitude,  
		longitude  
		FROM
		region
		WHERE
		region_number = #{regionNumber, jdbcType=INTEGER}
	</select>
```
>### 지역소개 작성
![image](https://github.com/user-attachments/assets/b9cf7a2c-8c25-46cf-9067-5ded60d65112)

- Front<br>
	- [지역소개 글쓰기- regionDetail.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/region_insert.jsp)<br>
- Back<br>
	- [데이터 추가 - RegionDetail.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/RegionInsertController.java)

- SQL
```
<insert id="insertRegion" parameterType="dto.RegionDTO">
		INSERT INTO region
		(
		region_number,
		title,
		description,
		create_time,
		image_url,
		latitude,
		longitude
		)
		VALUES
		(
		region_seq.NEXTVAL,
		#{title},
		#{description},
		SYSDATE,
		#{imageUrl, jdbcType=CLOB},
		#{latitude},
		#{longitude}
		)
	</insert>
```

>### 지역소개 수정
![image](https://github.com/user-attachments/assets/d1c1640d-8975-4203-95a5-2fb6b0cddc42)

- Front<br>
	- [지역소개 수정하기 - region_update.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/region_update.jsp)<br>
- Back<br>
	- [데이터 수정 - RegionUpdateController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/RegionUpdateController.java)

- SQL
```
<update id="updateRegion" parameterType="dto.RegionDTO">
		UPDATE region
		SET
		title = #{title},
		description = #{description},
		update_time = SYSDATE,
		image_url = #{imageUrl}, 
		latitude = #{latitude}, 
		longitude = #{longitude}
		WHERE region_number = #{regionNumber}
	</update>
```

>### 관리자 페이지
![image](https://github.com/user-attachments/assets/fe700490-f698-42d4-9294-000d84a1d78d)
- Front<br>
	-[관리자 페이지 버튼 - admin.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/admin.jsp)<br>

>### 관리자 회원 조회 화면
![image](https://github.com/user-attachments/assets/cdc09a4a-d516-43be-afda-0f048c075c9c)
- Front<br>
	- [관리자 회원 조회 화면 - users_list.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/users_list.jsp)
- Back<br>
	- [admin을 제외한 유저 정보 조회- AdminUserController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/AdminUserController.java)

- SQL
```
 <!-- admin을 제외한 유저 정보 조회 -->
	<select id="selectAllUsersExcludeAdmin"
		resultType="dto.UsersDTO">
		SELECT
		user_number AS userNumber,
		login_id AS loginId,
		nick_name AS
		nickName,
		user_name AS userName,
		user_email AS userEmail,
		create_time AS
		createTime
		FROM
		users
		WHERE
		grade != 'admin' OR grade IS NULL OR grade =
		''
		ORDER BY
		user_number ASC  <!-- 오름차순 정렬 -->
	</select>
```
>### 관리자 회원 상세 조회 화면
![image](https://github.com/user-attachments/assets/d5544ad6-4dca-44fb-87b3-426159bc3d03)
- Front<br>
	- [ 회원 상세 조회 화면 - user_detail.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/user_detail.jsp)<br>
- Back<br>
	- [ 회원 상세 조회 화면 - AdminUserController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/AdminUserController.java)<br>
- SQL
```
<!--유저 정보 상세조회 admin -->
	<select id="selectUserByNumber" parameterType="int"
		resultType="dto.UsersDTO">
		SELECT
		user_number AS userNumber,
		login_id AS loginId,
		nick_name AS nickName,
		password,
		create_time AS createTime,
		update_time
		AS updateTime,
		pw_update_time AS pwUpdateTime,
		user_name AS userName,
		user_email AS userEmail
		FROM
		users
		WHERE
		user_number = #{userNumber}
	</select>
```

>## 관리자 회원 삭제 화면
![image](https://github.com/user-attachments/assets/43d9f07d-65c2-4cf2-9f23-6c3bb3c0c448)
- Front<br>
	- [유저 삭제 화면 - user_list.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/users_list.jsp)<br>
- Back<br>
	- [유저 삭제 화면 -  AdminUserController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/AdminUserController.java)
- SQL
```
<!-- 사용자 댓글 삭제 admin -->
	<delete id="deleteCommentsByUserNumber" parameterType="int">
		DELETE
		FROM comments
		WHERE user_number = #{userNumber}
	</delete>

	<!-- 사용자 게시물 삭제 admin -->
	<delete id="deleteBoardsByUserNumber" parameterType="int">
		DELETE FROM
		boards
		WHERE user_number = #{userNumber}
	</delete>
	<!-- 사용자 삭제 admin -->
	<delete id="deleteUserByUserNumber" parameterType="int">
		DELETE FROM
		users
		WHERE user_number = #{userNumber}
	</delete>
```

>## 관리자 회원 검색 화면
>![image](https://github.com/user-attachments/assets/f9b4d325-8bf8-409f-a15b-ba396ddcae10)
- Front<br>
	- [관리자 회원 검색 화면 - users_list.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/users_list.jsp)<br>
- Back<br>
	- [관리자 회원 검색 화면 - ](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/AdminUserController.java)<br>
- SQL
```
<select id="selectUserByUserNumber" parameterType="int" resultType="dto.UsersDTO">
		SELECT
		user_number AS userNumber,
		login_id AS loginId,
		nick_name AS nickName,
		password,
		create_time AS createTime,
		update_time
		AS updateTime,
		pw_update_time AS pwUpdateTime,
		user_name AS userName,
		user_email AS userEmail
		FROM
		users
		WHERE
		user_number = #{userNumber}
	</select>
```

>### 게시글 신고 조회 화면
![image](https://github.com/user-attachments/assets/6626567d-d838-451f-98d7-f25b20c8045d)
- Front<br>
	- [게시글 신고 조회 화면 - adminCommentReportList.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/adminReportList.jsp)<br>
- Back<br>
	- [게시판 신고 목록 조회 , 검색 , 페이징  - CommentReportListController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/AdminReportListController.java)
- SQL
```
<select id="selectAllReports" resultType="dto.UserReportDTO">
		SELECT
		ur.REPORT_NUMBER AS reportNumber,
		ur.USER_NUMBER AS userNumber,
		ur.POST_NUMBER AS postNumber,
		ur.USER_REPORT_REASON AS userReportReason,
		ur.REPORT_STATUS AS reportStatus,
		TO_CHAR(ur.CREATE_TIME, 'YYYY-MM-DD HH24:MI:SS') AS createTime,
		COALESCE(ur.HANDLED_BY_ADMIN_ID, 0) AS handledByAdminId,
		bu.NICK_NAME AS postWriterNickname,
		u.NICK_NAME AS userNickname
		FROM
		USER_REPORTS ur LEFT JOIN BOARDS b ON ur.POST_NUMBER = b.POST_NUMBER
		LEFT JOIN USERS u ON ur.USER_NUMBER = u.USER_NUMBER
		LEFT JOIN USERS bu ON b.USER_NUMBER = bu.USER_NUMBER
		ORDER BY ur.CREATE_TIME DESC
	</select>
```
>### 댓글 신고 조회 화면
![image](https://github.com/user-attachments/assets/4c16b55d-79b3-4a35-965c-4ac60694dd94)
- Front<br>
	- [댓글 신고 조회 화면 - adminCommentReportList.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/adminCommentReportList.jsp)<br>
- Back<br>
	- [댓글 신고 조회 및 신고 승인, 거부 처리 - CommentReportListController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CommentReportListController.java)
- SQL
```
<!-- 댓글 신고 목록 조회 -->
	<select id="selectCommentReports" resultMap="comment">
		select * from
		CommentReportView
		ORDER BY report_number DESC
	</select>
 <!-- 댓글 관리 상태 변경 -->
 	<update id="updateCommentReportStatus" parameterType="map">
		UPDATE COMMENT_REPORTS
		SET REPORT_STATUS = #{status},
		HANDLED_BY_ADMIN_ID = #{adminId}
		WHERE REPORT_NUMBER = #{reportNumber}
	</update>

	<select id="findReportsWithPagination" parameterType="map" resultType="dto.UserReportDTO">
    SELECT *
    FROM (
        SELECT
            ur.REPORT_NUMBER AS reportNumber,
            ur.USER_NUMBER AS userNumber,
            ur.POST_NUMBER AS postNumber,
            ur.USER_REPORT_REASON AS userReportReason,
            ur.REPORT_STATUS AS reportStatus,
            TO_CHAR(ur.CREATE_TIME, 'YYYY-MM-DD HH24:MI:SS') AS createTime,
            COALESCE(ur.HANDLED_BY_ADMIN_ID, 0) AS handledByAdminId,
            COALESCE(bu.NICK_NAME, 'Unknown') AS postWriterNickname,
            COALESCE(u.NICK_NAME, 'Unknown') AS userNickname,
            ROW_NUMBER() OVER (ORDER BY ur.CREATE_TIME DESC) AS rn
        FROM USER_REPORTS ur
        LEFT JOIN BOARDS b ON ur.POST_NUMBER = b.POST_NUMBER
        LEFT JOIN USERS u ON ur.USER_NUMBER = u.USER_NUMBER
        LEFT JOIN USERS bu ON b.USER_NUMBER = bu.USER_NUMBER
    )
    WHERE rn BETWEEN #{start} AND #{end}
</select>

<select id="findReportsByMemberIdWithPagination" parameterType="map" resultType="dto.UserReportDTO">
    SELECT *
    FROM (
        SELECT
            ur.REPORT_NUMBER AS reportNumber,
            ur.USER_NUMBER AS userNumber,
            ur.POST_NUMBER AS postNumber,
            ur.USER_REPORT_REASON AS userReportReason,
            ur.REPORT_STATUS AS reportStatus,
            TO_CHAR(ur.CREATE_TIME, 'YYYY-MM-DD HH24:MI:SS') AS createTime,
            COALESCE(ur.HANDLED_BY_ADMIN_ID, 0) AS handledByAdminId,
            COALESCE(bu.NICK_NAME, 'Unknown') AS postWriterNickname,
            COALESCE(u.NICK_NAME, 'Unknown') AS userNickname,
            ROW_NUMBER() OVER (ORDER BY ur.CREATE_TIME DESC) AS rn
        FROM USER_REPORTS ur
        LEFT JOIN BOARDS b ON ur.POST_NUMBER = b.POST_NUMBER
        LEFT JOIN USERS u ON ur.USER_NUMBER = u.USER_NUMBER
        LEFT JOIN USERS bu ON b.USER_NUMBER = bu.USER_NUMBER
        WHERE ur.USER_NUMBER = #{memberId}
    )
    WHERE rn BETWEEN #{start} AND #{end}
</select>

```

>### 게시판 메인 화면
![image](https://github.com/user-attachments/assets/2832ce1e-4034-487e-a560-83826e80ede6)
- Front<br>
	- [게시판 메인 화면 - board_list.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/board_list.jsp)<br>
	
	- Back<br>
	- [게시판 전체 조회 - BoardMainView.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardMainView.java)<br>
	- [게시판 글쓰기 화면으로 이동 - BoardInsertViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardInsertViewController.java)<br>
	- [게시판 검색 및 페이징 -BoardMainView.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardMainView.java)<br>
	- [(카테고리 , 작성자 , 제목)에 대한 검색 및 페이징 -BoardSelectController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardSelectController.java)<br>
	- [카테고리 댓글 카운팅 -BoardsCategoryController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardsCategoryController.java)<br>

- SQL
```
<select id="selectAllBoards" resultMap="boards">
		SELECT * FROM BOARD_VIEW_WITH_REPORT
		ORDER BY POST_NUMBER DESC
	</select>

	<!-- 전체 게시판 페이징 -->
	<select id="selectBoards" resultMap="boards">
		SELECT *
		FROM BOARD_VIEW_WITH_REPORT
		ORDER BY POST_NUMBER DESC
		OFFSET #{offset} ROWS FETCH NEXT #{limit}
		ROWS ONLY
	</select>
	
	<!-- 게시판 검색 -->
	<select id="searchBoards" resultMap="boards">
		SELECT
		*
		FROM
		BOARD_VIEW_WITH_REPORT
		WHERE 1=1
		<if test="tag != null and tag.trim() != ''">
			AND TAG = #{tag} <!-- 카테고리 필터링 -->
		</if>
		<if
			test="type == 'title' and keyword != null and keyword.trim() != ''">
			AND TITLE LIKE '%' || #{keyword} || '%' <!-- 제목 검색 -->
		</if>
		<if
			test="type == 'writer' and keyword != null and keyword.trim() != ''">
			AND NICK_NAME LIKE '%' || #{keyword} || '%' <!-- 작성자 검색 -->
		</if>
		ORDER BY
		<choose>
			<when test="sort == 'bcount'">BCOUNT</when> <!-- 조회수 -->
			<when test="sort == 'blike'">BLIKE</when>   <!-- 좋아요 -->
			<when test="sort == 'createTime'">CREATE_TIME</when> <!-- 작성 시간 -->
			<otherwise>B.POST_NUMBER</otherwise>          <!-- 기본 정렬 -->
		</choose>
		<if test="order == 'asc'">ASC</if>
		<if test="order == 'desc'">DESC</if>
		OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY <!-- 페이징 처리 -->
	</select>

	<!-- 게시판 페이징 -->
	<select id="getBoardCount" resultType="int">
		SELECT COUNT(*)
		FROM BOARDS B
		LEFT JOIN USERS U
		ON B.USER_NUMBER =
		U.USER_NUMBER
		WHERE 1=1
		<if test="tag != null and tag.trim() != ''">
			AND B.TAG = #{tag}
		</if>
		<if
			test="keyword != null and keyword.trim() != '' and type != null">
			<choose>
				<when test="type == 'title'">
					AND B.TITLE LIKE '%' || #{keyword} || '%'
				</when>
				<when test="type == 'writer'">
					AND U.NICK_NAME LIKE '%' || #{keyword} || '%'
				</when>
			</choose>
		</if>
	</select>

	<!-- 카테고리 댓글 카운팅  -->
	<select id="getBoardsByTagWithPaging" resultMap="boards">
		SELECT
		*
		FROM
		BOARD_VIEW 
		WHERE
		TAG = #{tag}
		ORDER BY
		CREATE_TIME DESC
		OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY
	</select>
	
	<!-- 카테고리 페이징 --> 
	<select id="getBoardsByTagWithPaging" resultMap="boards">
    	SELECT *
    	FROM BOARD_VIEW 
    	WHERE TAG = #{tag}
    	ORDER BY CREATE_TIME DESC
    	OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY
	</select>

	<!-- 카테고리 필터링 -->
	<select id="searchBoards" resultMap="boards">
   	 SELECT *
    	FROM BOARD_VIEW_WITH_REPORT
   	 WHERE 1=1
 	   <if test="tag != null and tag.trim() != ''">
    	    AND TAG = #{tag} <!-- 카테고리 필터링 -->
 	   </if>
  	  <if test="type == 'title' and keyword != null and keyword.trim() != ''">
    	    AND TITLE LIKE '%' || #{keyword} || '%' <!-- 제목 검색 -->
   	 </if>
  	  <if test="type == 'writer' and keyword != null and keyword.trim() != ''">
    	    AND NICK_NAME LIKE '%' || #{keyword} || '%' <!-- 작성자 검색 -->
   	 </if>
   	 ORDER BY
  	  <choose>
     	   <when test="sort == 'bcount'">BCOUNT</when> <!-- 조회수 -->
     	   <when test="sort == 'blike'">BLIKE</when>   <!-- 좋아요 -->
     	   <when test="sort == 'createTime'">CREATE_TIME</when> <!-- 작성 시간 -->
     	   <otherwise>B.POST_NUMBER</otherwise>          <!-- 기본 정렬 -->
  	  </choose>
   	 <if test="order == 'asc'">ASC</if>
   	 <if test="order == 'desc'">DESC</if>
  	  OFFSET #{offset} ROWS FETCH NEXT #{limit} ROWS ONLY <!-- 페이징 처리 -->
	</select>
	
```

>### 게시판 상세 조회 화면
![image](https://github.com/user-attachments/assets/c92c687a-cace-45ab-9e22-de339285436a)
>#### 게시글
- Front<br>
	- [게시글 상세 조회 화면 - board_view.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/board_view.jsp)<br>
- Back<br>
	- [게시글 상세 조회 - BoardViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardViewController.java)<br>
	- [게시글 삭제 - BoardDeleteController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardDeleteController.java)<br>
	- [게시글 수정 화면으로 이동 - BoardUpdateViewController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardUpdateViewController.java)<br>
	- [게시글 좋아요 - BoardLikeController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardLikeController.java)<br>
- SQL
```
<!-- 게시글 하나만 조회 -->
	<select id="selectBoardByPostNumber" resultMap="boards">
		select * from
		BOARD_VIEW
		WHERE POST_NUMBER = #{postNumber, jdbcType=INTEGER}
	</select>
<!-- 게시글 삭제 -->
	<delete id="deleteBoardByPostNumber">
		DELETE FROM BOARDS WHERE POST_NUMBER = #{postNumber,
		jdbcType=INTEGER}
	</delete>
<!-- 게시글 좋아요 입력 -->
	<insert id="insertBoardLike" parameterType="map">
		insert into board_likes(post_number, user_number)
		values(#{postNumber},#{userNumber})
	</insert>
<!-- 게시글 좋아요 삭제 -->
	<delete id="deleteBoardLike" parameterType="map">
		delete from board_likes
		where post_number = #{postNumber} and user_number = #{userNumber}
	</delete>
```
>#### 댓글
- Back<br>
	- [댓글 작성 - CommentWriteController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CommentWriteController.java)<br>
	- [댓글 삭제 - CommentDeleteController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CommentDeleteController.java)<br>
	- [댓글 좋아요 - BoardCommentLikeController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardCommentLikeController.java)<br>
- SQL 
```
<!-- 댓글 조회 -->
	<select id="getCommentList" resultMap="comments">
		select * from
		comments_view where post_number = #{postNumber} ORDER BY
		COMMENT_NUMBER
	</select>
<!-- 댓글 작성 -->
	<insert id="insertComment" parameterType="dto.CommentsDTO">
		insert into
		comments(comment_number, post_number, user_number, c_description)
		values(SEQ_COMMENTS_COMMENT_NUMBER.nextval, #{postNumber},
		#{userNumber}, #{cDescription})
	</insert>
<!-- 댓글 삭제 -->
	<delete id="deleteComment">
		DELETE FROM COMMENTS WHERE COMMENT_NUMBER =
		#{commentNumber}
	</delete>
<!-- 댓글 좋아요 입력 -->
	<insert id="insertCommentLike" parameterType="map">
		insert into comment_likes(comment_number, user_number)
		values(#{commentNumber},#{userNumber})
	</insert>
<!-- 댓글 좋아요 삭제 -->
	<delete id="deleteCommentLike" parameterType="map">
		delete from comment_likes
		where comment_number = #{commentNumber} and user_number = #{userNumber}
	</delete>
```
>#### 파일 다운로드
- Back
	- [파일 다운로드 - BoardFileDownController.java](https://github.com/01LEE/kh_semi_project/blob/choi/src/main/java/controller/BoardFileDownController.java)<br>
- SQL
```
<!-- 첨부파일 목록 -->
	<select id="selectFileList" parameterType="int" resultMap="file">
		select * from board_file where post_number = #{postNumber}
	</select>
<!-- 파일 다운로드 -->
	<select id="selectFilePath" parameterType="int" resultMap="file">
		select file_path, file_name from board_file where file_number =
		#{fileNumber}
	</select>
```
>### 게시글 신고
![image](https://github.com/user-attachments/assets/e04b8ef6-a2a8-40f0-8a7e-f3419b10bb43)
- Front
```
// 게시글 신고
	function openModal(board) {
		let userNumber = '${sessionScope.user.getUserNumber()}';
		let writerNumber = '${board.userNumber}'
		if(userNumber == writerNumber){
			alert('자기 자신이 쓴 게시글은 신고할 수 없습니다.');
            return;
		}
		
		var modal = document.getElementById('reportModal');
		document.getElementById('modalPostTitle').innerText = board.title;
		document.getElementById('modalPostNumber').value = board.postNumber;
		document.getElementById('modalPostNumberDisplay').innerText = board.postNumber;
		document.getElementById('modalAuthorId').innerText = board.nickName;
		// 사용자 닉네임을 세션에서 가져오거나 입력하도록 설정
		var userNickname = "${sessionScope.user != null ? sessionScope.user.nickName : ''}";
		document.getElementById('modalUserNickname').value = userNickname;
		modal.style.display = 'block';
	}

	function closeModal() {
		var modal = document.getElementById('reportModal');
		modal.style.display = 'none';
	}
```
- Back<br>
	- [게시글 신고 - ReportWriteController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/ReportWriteController.java)
>### 댓글 신고
![image](https://github.com/user-attachments/assets/ab01b85a-728b-46d8-ac2c-397ac2243f09)
- Front
```
// 신고 모달 열기
    window.openCommentReportModal = function(commentNumber, commentContent, commentUserNumber) {
        if (!user) {
            alert('로그인 후 댓글 신고를 할 수 있습니다.');
            window.location.href = './login.do'; // 로그인 페이지로 리디렉션
            return;
        }
        let userNumber = '${sessionScope.user.getUserNumber()}';
		let writerNumber = commentUserNumber;
		if(userNumber == writerNumber){
			alert('자기 자신이 쓴 댓글은 신고할 수 없습니다.');
            return;
		}
        document.getElementById('commentReportModal').style.display = 'block';
        document.getElementById('commentNumber').value = commentNumber;
        document.getElementById('commentContent').innerText = commentContent;
    };

    // 신고 모달 닫기
    function commentCloseModal() {
        document.getElementById('commentReportModal').style.display = 'none';
    }

    // 'X' 버튼 클릭 시 모달 닫기
    document.querySelector('.commentclose').addEventListener('click', commentCloseModal);

});
```
- Back<br>
	- [댓글 신고 - CommentReportInsertController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/CommentReportInsertController.java)
- SQL
```
<!-- 댓글 신고 -->
	<insert id="insertCommentReport"
		parameterType="dto.CommentReportDTO">
		insert into comment_reports(report_number,
		comment_number, user_number,
		comment_report_reason)
		values
		(comment_reports_report_number_seq.nextval, #{commentNumber},
		#{userNumber}, #{commentReportReason})
	</insert>
```
>### 게시판 글 작성
![image](https://github.com/user-attachments/assets/55106eff-f9a0-431f-ac86-bd1ce4a5199b)
- Front<br>
	- [게시판 글 작성 페이지 - board_insert.jsp](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/webapp/board_insert.jsp) <br>
- Back<br>
	- [게시판 글 작성 및 파일 업로드 - BoardInsertController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardInsertController.java)<br>
- SQL
```
<!-- 게시판 글쓰기 쿼리 -->
	<insert id="insertBoard" parameterType="dto.BoardsDTO">
		INSERT INTO
		boards(post_number, user_number, title, description, create_time, tag)
		VALUES(#{postNumber}, #{userNumber}, #{title}, #{description},
		SYSDATE, #{tag})
	</insert>
<!-- 파일업로드 글 번호 확인 -->
	<select id="selectPostNumber" resultType="int">
		select
		POST_NUMBER_SEQ.nextval from dual
	</select>
<!-- 파일 업로드 -->
	<insert id="insertBoardFile" parameterType="dto.BoardFileDTO">
		insert into
		board_file(file_number,post_number,file_path,file_name)
		values(FILE_NUMBER_SEQ.nextval, #{postNumber}, #{filePath}, #{fileName})
	</insert>
```
>### 게시판 글 수정
![image](https://github.com/user-attachments/assets/ef418bab-4d5b-4558-b0e1-f9aa514cf1c4)
- Front<br>
	- [게시판 글 수정 화면 - board_update.jsp](https://github.com/01LEE/kh_semi_project/blob/choi/src/main/webapp/board_update.jsp)<br>
- Back<br>
	- [게시판 글 수정 - BoardUpdateController.java](https://github.com/01LEE/kh_semi_project/blob/semi_project/src/main/java/controller/BoardUpdateController.java)<br>
- SQL
```
<!-- 기존 업로드 된 파일 삭제 -->
	<delete id="deleteBoardFile">
		delete from board_file where post_number =
		#{postNumber}
	</delete>
<!-- 파일 업로드 -->
	<insert id="insertBoardFile" parameterType="dto.BoardFileDTO">
		insert into
		board_file(file_number,post_number,file_path,file_name)
		values(FILE_NUMBER_SEQ.nextval, #{postNumber}, #{filePath}, #{fileName})
	</insert>
```
>### 프로젝트 초기 ERD 

- ERD<br>
  - (https://www.erdcloud.com/d/XjJBCsozqDjq62vTo)<br>
![image](https://github.com/user-attachments/assets/eb236cae-d796-434f-a4c7-5397cb4596ee)



>## 6. 프로젝트 소감 및 향후 계획
- 이현성 : 프로젝트를 진행하며 클라이언트와 서버 간 상호작용에 대해 깊이 이해하게 되었고, 각각의 코드와 함수가 가진 장단점을 명확히 알 수 있었습니다.
	또한, 사용자 입장에서 고민하고 설계하는 과정을 통해 사용자 경험의 중요성을 더욱 실감하게 되었으며, 이를 기반으로 팀원들과 소통하는 것의 중요성도 깊이 느낄 수 있었습니다.
	
  향후 계획 : 앞으로는 현재까지 인지하지 못한 기능들을 학습하고, 사용자에게 더 나은 서비스를 제공할 수 있는 방법을 찾아 나갈 계획입니다. 이를 위해 새로운 기술을 탐구하고, 개선 가능한 부분을 모색할 생각입니다.

- 최승인 : 처음엔 배운 내용을 실제로 적용하는 방법에 대한 감이 잘 잡히지 않아 막막했지만, 프로젝트를 진행하면서 점차 내가 무엇을 알고 있고, 어떤 부분이 부족한지 구체적으로 파악할 수 있었습니다. 이번 프로젝트를 통해 기본적인 파일 업로드 기능을 구현했지만, 이후에는 업로드된 파일을 개별적으로 관리할 수 있도록 수정할 계획입니다.

- 이형준 :

- 홍필진 : 첫 프로젝트를 성공적으로 끝낸 거 같아 굉장히 뿌듯합니다 코딩을 하며 이걸 배워서 어떤 것을 만들 수 있나?라는 생각이 항상 의문점으로 남았었는데 프로젝트를 진행하며 코드의 흐름, Back , front의 코드를 모아보니 더욱더 무엇인가 명확해진 거 같습니다 코드를 작성 중 프로젝트 기간 동안 코드 작성할 시간 동안 4시간이 5분인 것처럼 느껴졌고
		   팀원과 원활한 커뮤니케이션, 업무수행능력이 잘 발휘된 거 같아 굉장히 기쁩니다 이번 프로젝트와 국비 기간 중 배운 기술을 토대로 계속 업무능력을 향상시켜
      	   더 좋은 퀄리티의 개발을 하고 싶다는 생각이 들었습니다.

- 장호진 : 처음 코딩을 배우고 처음 해보는 프로젝트 였지만 물론 처음에 다 어렵고 힘들었지만 그래도 마지막에는 결과물을 통해서 내가 하고자 하는 부분들을 다 이루어 내어서 뿌듯하다.코드를 직접 작성해보며 연결 되는 부분들을 조금이나마 더 이해할 수 있었던 것 같다. 앞으로 좀 더 편리하고 보완성이 뛰어난 부분들을 더욱더 공부하여 사용해보고 싶다는 생각을 하였고 다음에는 나 혼자 뭔가를 만들어보고자라는 생각을 하게 되었다.
>## 7. Q & A






# KH 결사대 Final_Project
# 차량 용품 , 렌트카 , 중고차 판매 사이트
## 🏆 팀 소개

### 1. 팀 이름
KH 결사대

### 2. 팀원
- **팀장**: 이현성  
- **팀원**: 이민, 장호진, 홍필진, 김창수

## 📌 프로젝트 소개

### 🔹 기획 의도
- 차량 용품, 차량 렌트, 중고차 구매가 가능한 사용자 편리 웹사이트 제공

### 🔹 목표
- 차량 용품, 차량 렌트, 중고차 구매 기능 통합 제공
- 차량 구매와 함께 필요한 차량용품을 한 번에 구매 가능하도록 구성

## ⚙️ 개발 환경

### 🔹 사용 언어
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

## 🚗 구현 기능

### 🔹 **이현성**
- 로그인 / 카카오 로그인 및 로그아웃
- 회원가입, ID/PW 찾기, 이메일 인증, 주소 검색
- 마이페이지 (포인트 충전, 구매 내역 및 렌트카 예약 내역 확인, 프로필 수정, 회원 탈퇴)

### 🔹 **이민**
- 쇼핑몰 페이지 (상품 목록 & 필터링)
- 상품 상세 페이지 (상품 정보 표시, 장바구니 추가 기능, 바로 구매 기능)
- 장바구니 기능 (조회, 수량 조정, 내역 저장)
- 결제 기능 (포인트 결제 지원, 재고 감소 처리, 트랜잭션 관리, 결제 내역 저장)
- 결제 내역(명세서) 조회
- 쇼핑몰 관리자 기능 (데이터 삽입, 수정, 삭제, 조회, 검색)

### 🔹 **장호진**
- 렌트카 관리자 (데이터 삽입, 수정, 삭제, 조회, 검색)
- 렌트카 페이지 (상품 목록 출력)
- 렌트카 상세 페이지 (렌트카 정보 표시, 렌트카 예약 및 결제)
- 예약 기능 (포인트 결제 지원, 결제/예약 내역 저장)

### 🔹 **홍필진**
- 중고차 페이지 (상품 목록 & 필터링 & 페이징)
- 중고차 상세 페이지 (상품 상세 정보 표시, 차량 설명 에디터, 결제 기능)
- 결제 기능 (차량 결제 완료 시 숨김 처리, 트랜잭션 관리, 결제 내역 저장)
- 중고차 관리자 (데이터 삽입, 수정, 삭제, 조회, 검색)
- 전국 직영점 (각 매장 지역별 차량 조회, 지도 API 활용)
- ChatBot ( 지역별 차량 조회, 차량 상세정보 조회)
### 🔹 **김창수**
- 고객센터 (매뉴얼 및 문의 게시판)

## 🔍 설계의 주안점
- 카카오 로그인을 포함한 간편 로그인 기능 지원
- JWT 기반의 인증 및 인가 시스템 적용
- 비밀번호 암호화(Bcrypt) 및 이메일 인증을 통한 보안 강화
- 프론트엔드에서 React를 활용하여 유지보수가 용이한 구조로 개발
- Base64를 사용한 이미지 저장 방식 적용
- LocalStorage를 이용한 장바구니 데이터 저장
- 포인트 충전을 통한 사이트 내 구매 편의 제공
- TipTap Editor 활용
- Kakao Map API를 사용한 위치 정보 제공

- 구현 화면
-  1. 관리자 대시보드  ![image](https://github.com/user-attachments/assets/0704629b-170d-4081-89e1-21f3299fe8b5)
   2. 차량 관리자 목록 열고 화면![image](https://github.com/user-attachments/assets/cc4c0bff-5b8e-48ec-845b-88ba8d940628)
   3. 차량 관리자 목록열고 차량명만 넣고 검색했을때 ![image](https://github.com/user-attachments/assets/36cf74b0-003b-4c3d-b50b-0eaa4aad611f)
   4. 차량 관리자 목룍열고 차량명 , 차량번호 둘다 입력 후 검색했을때 ![image](https://github.com/user-attachments/assets/c6b703c9-97ae-4481-ad26-9feb42084b02)
   5. 차량 관리자 새 차량 등록 ![image](https://github.com/user-attachments/assets/b0989d35-9b4b-444a-8994-3e45ee66e968)
   6. 차량 게시판 화면 ![image](https://github.com/user-attachments/assets/42b1f42c-661a-48f4-85d9-d8fb73e5a04c)
   7. 차량 게시판에서 특정차량 검색 필터 기본값 적은 주행거리순 ![image](https://github.com/user-attachments/assets/6c0aaa17-0072-4bdf-af6f-5aa8cc827dff)
   8. 차량 게시판에서 특정 차량 검색 필터 낮은가격순 , 카테고리 변경 ![image](https://github.com/user-attachments/assets/900325d3-c610-4e50-abf3-ba37624ae692)
   9. 차량 상세페이지 ![image](https://github.com/user-attachments/assets/37726014-7929-4969-b380-1aa7e6b32c86)
   10. 차량 결제정보 페이지 이동 - > ![image](https://github.com/user-attachments/assets/3b5943e0-4e05-4f2a-bdd4-e2315efaa32a)
   11. 차량 결제정보 상세페이지로 이동 - > ![image](https://github.com/user-attachments/assets/91733cae-0b0d-4620-886f-77731c5c597c)
   12. 전국 직영점 첫 페이지 ![image](https://github.com/user-attachments/assets/8198935d-f6bd-4de3-b3db-3fb78be2a4ed)
   13. 전국 직영점 지역선택 후 화면 ![image](https://github.com/user-attachments/assets/273c20c8-3677-4b43-89c4-59455f09e17c)특정차량 클릭시 해당차량 상세페이지로 다이렉트 이동
   14. 챗봇 ![image](https://github.com/user-attachments/assets/450a3b8c-e71b-40ea-836a-29737e1e3fb1)특정지역 차량목록 출력
   15. 챗봇 ![image](https://github.com/user-attachments/assets/cfee6c49-e196-4df4-8d09-4da3084f3257)특정 차량번호 정보 출력
   16. 










