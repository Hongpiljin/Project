<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>전체 회원 정보</title>
    <link rel="stylesheet" type="text/css" href="css/users_list.css">
</head>
<body>
    <!-- 공통 헤더 -->
    <jsp:include page="./views/header.jsp"></jsp:include>
    <div class="container">
        <h2>전체 회원 정보</h2>
        <div style="margin-bottom: 20px;">
            <form method="get" action="${pageContext.request.contextPath}/adminReports.do">
                <input type="text" name="memberId" placeholder="회원 번호로 검색" value="${param.memberId}" />
                <button type="submit" style="padding: 8px 12px; border-radius: 4px; background-color: #007bff; color: white; border: none; cursor: pointer;">검색</button>
            </form>
        </div>
<c:if test="${not empty reports}">
    <table>
        <thead>
            <tr>
                <th>신고 번호</th>
                <th>신고자 회원번호</th>
                <th>게시글 번호</th>
                <th>작성자 닉네임</th>
                <th>신고 사유</th>
                <th>신고 상태</th>
                <th>신고 일시</th>
                <th>처리 관리자 ID</th>
                <th>조치</th>
            </tr>
        </thead>
        <!-- Add table rows for reports here -->
    </table>
</c:if>
        

        <!-- 사용자 목록 테이블 -->
        <table>
            <thead>
                <tr>
                    <th>유저 번호</th>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>가입일</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <c:choose>
                    <c:when test="${empty requestScope.list}">
                        <!-- 사용자가 없는 경우 -->
                        <tr>
                            <td colspan="7">회원 정보가 없습니다.</td>
                        </tr>
                    </c:when>
                    <c:otherwise>
                        <!-- 사용자 목록 출력 -->
                        <c:forEach var="users" items="${requestScope.list}">
                            <tr>
                                <td>${users.userNumber}</td>
                                <td>${users.loginId}</td>
                                <!-- 닉네임에 상세보기 링크 추가 -->
                                <td>
                                    <a href="adminUser.do?action=detail&userNumber=${users.userNumber}">
                                        ${users.nickName}
                                    </a>
                                </td>
                                <td>${users.createTime}</td>
                                <td>${users.userName}</td>
                                <td>${users.userEmail}</td>
                                <td>
                                    <!-- 삭제 버튼 -->
                                    <form action="adminUser.do" method="post">
                                        <input type="hidden" name="action" value="delete" />
                                        <input type="hidden" name="userNumber" value="${users.userNumber}" />
                                        <button type="submit" onclick="return confirm('정말 삭제하시겠습니까?');">삭제</button>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>
            </tbody>
        </table>
    </div>
    	<jsp:include page="./views/footer.jsp"></jsp:include>
    
</body>
</html>