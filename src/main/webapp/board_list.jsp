<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Boards List</title>
<link rel="stylesheet" type="text/css" href="css/boardList.css">
<body>
  <jsp:include page="./views/header.jsp"></jsp:include>
       <div class="main-container">
        <!-- 왼쪽 카테고리 -->
        <div class="category-container">
            <a href="${pageContext.request.contextPath}/boardsCategory.do" class="category-item">
                <span class="category-icon icon-all"></span>
                전체
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=자유" class="category-item">
                <span class="category-icon icon-free"></span>
                자유
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=후기" class="category-item">
                <span class="category-icon icon-review"></span>
                후기
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=팁" class="category-item">
                <span class="category-icon icon-tip"></span>
                팁
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=숙소" class="category-item">
                <span class="category-icon icon-accommodation"></span>
                숙소
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=여행일정" class="category-item">
                <span class="category-icon icon-schedule"></span>
                여행일정
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=교통정보" class="category-item">
                <span class="category-icon icon-traffic"></span>
                교통정보
            </a>
            <a href="${pageContext.request.contextPath}/boardsCategory.do?tag=Q&A" class="category-item">
                <span class="category-icon icon-qa"></span>
                Q&A
            </a>
        </div>

        <!-- 메인 콘텐츠 -->
        <div class="body-container">
            <h1>게시글 목록</h1>

            <!-- 필터 및 정렬 버튼 -->
            <div class="filter-container">
                <form method="get" action="boardsList.do">
                    <select name="tag">
                        <option value="">카테고리</option>
                        <option value="팁" ${param.tag == '팁' ? 'selected' : ''}>팁</option>
                        <option value="자유" ${param.tag == '자유' ? 'selected' : ''}>자유</option>
                        <option value="후기" ${param.tag == '후기' ? 'selected' : ''}>후기</option>
                    </select>
                      <select name="type">
					<option value="title" <c:if test="${param.type == 'title'}">selected</c:if>>제목</option>
					<option value="writer" <c:if test="${param.type == 'writer'}">selected</c:if>>작성자</option>
					</select>
                    <input type="text" name="keyword" placeholder="제목 검색" value="${param.keyword}" />
                    <button type="submit">검색</button>
                </form>
                <!-- 정렬 버튼 -->
                <div class="sort-container">
                    <a href="boardsList.do?sort=bcount&order=${param.sort == 'bcount' && param.order == 'desc' ? 'asc' : 'desc'}&keyword=${param.keyword}&tag=${param.tag}&type=${param.type}&page=${param.page}">
                        <button>조회수 ${param.sort == 'bcount' && param.order == 'desc' ? '낮은순' : '높은순'}</button>
                    </a>
                    <a href="boardsList.do?sort=blike&order=${param.sort == 'blike' && param.order == 'desc' ? 'asc' : 'desc'}&keyword=${param.keyword}&tag=${param.tag}&type=${param.type}&page=${param.page}">
                        <button>좋아요 ${param.sort == 'blike' && param.order == 'desc' ? '낮은순' : '높은순'}</button>
                    </a>
                </div>
            </div>

            <!-- 게시판 테이블 -->
            <table class="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>카테고리</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회</th>
                        <th>좋아요</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="board" items="${list}">
                        <tr>
                            <td>${board.postNumber}</td>
                            <td>
                                <a href="boardDetail.do?postNumber=${board.postNumber}">${board.title}</a>
                                <c:if test="${board.ccount > 0}">
                                    <span class="comment">[${board.ccount}]</span>
                                </c:if>
                            </td>
                            <td>${board.tag}</td>
                            <td>${board.nickName}</td>
                            <td>${board.formattedCreateTime}</td>
                            <td>${board.bcount}</td>
                            <td>${board.blike}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>

           <!-- 페이징 -->
            <div class="pagination">
                <!-- 이전 버튼 -->
                <c:if test="${currentPage > 1}">
                    <a href="boardsList.do?page=${currentPage - 1}&tag=${param.tag}&keyword=${param.keyword}&type=${param.type}&sort=${param.sort}&order=${param.order}">
                        <button>이전</button>
                    </a>
                </c:if>
                <!-- 페이지 번호 -->
                <c:forEach var="i" begin="1" end="${totalPages}">
                    <a href="boardsList.do?page=${i}&tag=${param.tag}&keyword=${param.keyword}&type=${param.type}&sort=${param.sort}&order=${param.order}">
                        <button <c:if test="${i == currentPage}">class="active"</c:if>>${i}</button>
                    </a>
                </c:forEach>
                <!-- 다음 버튼 -->
                <c:if test="${currentPage < totalPages}">
                    <a href="boardsList.do?page=${currentPage + 1}&tag=${param.tag}&keyword=${param.keyword}&type=${param.type}&sort=${param.sort}&order=${param.order}">
                        <button>다음</button>
                    </a>
                </c:if>
            </div>
            <!-- 목록 & 글쓰기 버튼 -->
            <div class="action-buttons">
                <a href="./allBoard.do">
                    <button>목록</button>
                </a>
                <a href="./boardWriteView.do">
                    <button>글쓰기</button>
                </a>
            </div>
        </div>
    </div>
</body>
