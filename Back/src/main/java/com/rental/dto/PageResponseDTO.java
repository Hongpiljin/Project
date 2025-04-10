package com.rental.dto;

import java.util.List;

public class PageResponseDTO<T> {

    private List<T> content;   // 실제 데이터 목록
    private int page;          // 현재 페이지 번호 (0부터 시작)
    private int size;          // 한 페이지에 담긴 개수
    private long totalElements; // 전체 데이터 수
    private int totalPages;    // 전체 페이지 수
    private boolean last;      // 마지막 페이지인지 여부

    public PageResponseDTO() {}

    public PageResponseDTO(List<T> content, int page, int size, long totalElements, int totalPages, boolean last) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.last = last;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }
}
