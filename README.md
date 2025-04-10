# KH2조 Semi_Project
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
>### 관리자 기능(홍필진)
- 회원 전체 조회 및 삭제(홍필진)
- 게시글 신고 목록 조회 및 검색처리(홍필진)
>### 게시판(담당자 :홍필진)
- 게시글 전체 조회(홍필진)
- 게시글 검색, 정렬 기능, 페이징(홍필진)
- 게시글 신고(홍필진)

>## 5. 화면 및 코드 리뷰
>### 메인화면
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
>### 프로젝트 초기 ERD 
- ERD<br>
  - (https://www.erdcloud.com/d/XjJBCsozqDjq62vTo)<br>
![image](https://github.com/user-attachments/assets/eb236cae-d796-434f-a4c7-5397cb4596ee)



>## 6. 프로젝트 소감 및 향후 계획
첫 프로젝트를 성공적으로 끝낸 것 같아 굉장히 뿌듯합니다.
코딩을 하며 "이걸 배워서 어떤 것을 만들 수 있을까?"라는 생각이 항상 의문으로 남아 있었는데, 프로젝트를 진행하며 코드의 흐름과 Back-End, Front-End의 코드를 함께 보니 점점 더 명확해지는 것을 느낄 수 있었습니다.
코드를 작성하는 동안, 프로젝트 기간 중 하루 4시간의 코딩 시간이 5분처럼 느껴질 정도로 몰입할 수 있었고, 팀원들과의 원활한 커뮤니케이션과 협업 능력도 잘 발휘되어 매우 기뻤습니다.
이번 프로젝트와 교육과정 기간 동안 배운 기술을 토대로 앞으로도 업무 역량을 계속 향상시키고, 더 좋은 퀄리티의 개발을 하고 싶다는 생각이 들었습니다.
