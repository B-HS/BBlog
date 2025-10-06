<img width="1024" alt="image" src="https://github.com/user-attachments/assets/9d95cb48-ca3d-4438-8a0e-0d65a6fd35fc">

## BBlog

-   Nexjts
-   Drizzle
-   Shadcn/ui
-   Tailwind
-   Zustand
-   Cognito
-   MDX
-   React query

## 업데이트 예정
-   사이트
    -   [x] 리팩토링
        - 시맨틱태그
        - 배럴링
        - iOS26에 맞춰 horizontal-scrollbar 삭제
    -   [x] robots.txt 작성
    -   [x] sitemap.xml 작성
    -   [x] 게시글 TOC 생성
        - [Scrollbar TOC 라이브러리 ↗ ](https://github.com/B-HS/scrollbar-toc) 작성 및 교체
    -   [x] 어드민인경우 삭제 글 opacity처리
    -   [x] 더 나은 모바일 환경
    -   [x] global-error.tsx 추가
    -   [x] nextjs v15 마이그레이션
    -   [x] tailwind v4 마이그레이션
    -   [x] fetch caching opt 추가
    -   [x] 게시글 수정 시에 버그 수정
        -   그냥 order by이슈였음
    -   [x] Revalidate 추가
    -   이미지 리스트
        -   [x] 캐싱문제 해결
        -   [x] [이미지서버 구현 (honojs) ↗ ](https://github.com/B-HS/Image-Bucket)
        -   [x] 이미지 링크 교체
        -   [x] 게시글 이미지 전역 Fallback 핸들러 추가
    -   댓글
        -   [x] 댓글 post/put 문제 해결
-   관리자 페이지
    -   [x] 기본 레이아웃 및 가상 라우팅
    -   대시보드
        -   [x] 일일 방문자 수
        -   [x] 월간 방문자 수
        -   [x] 기간별 인기순 게시글
        -   [x] ~~방문자 수 검색 다시 짜기~~
            -   윈도우 함수 문제 없는 것 확인
    -   글 관리
        -   [x] 글 리스트
        -   [x] 글 상태 변경 (숨김처리, 코멘트 여부)
        -   [x] 글 삭제
    -   코멘트 관리
        -   [x] 코멘트 리스트
        -   [x] 코멘트 숨김
