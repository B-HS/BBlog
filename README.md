![preview](https://github.com/B-HS/BBlog/assets/49316060/ddee7e0a-5291-42b2-9955-107ea67fc60e)

## BBlog

---

-   Nexjts
-   Supabase
-   shadcn/ui
-   tailwind

---

## 업데이트 예정 내역

-   [x] 이미지를 무조건 public을 보는게 아니라 절대경로로 보기 (r2도 쓰게끔하기 위해서)
-   [x] 위의 사항이 안되면 git명령어를 자동화하기
-   [x] tile 컴포넌트 이미지부분 max width 설정
-   [x] 임시저장
-   [x] 메타태그 최적화
-   [x] TOC
-   [x] 레이아웃 수정 (포스트 카드)
-   [x] robot.txt 추가
-   [x] sitemap.xml 추가
-   [ ] 에디터 textarea > novel로 변경
-   [ ] TOC 최적화 (라이브러리를 쓰던 뭘 하던 일단 수정)
-   [ ] 쉘스크립트 짜서 빌드 자동화
-   [ ] Github Action으로 배포 자동화 (그냥 git pull 당기는 작업만 자동화하면됨)
-   [ ] 게시글 검색
-   [ ] 에디터에서, 이미지 붙여넣기 할 때 자동으로 서버에 올리는 로직

# 블로그 글

-   [[BBlog mdx] Nextjs + 마크다운으로 블로그를 작성해보자 - 2](https://hbyun.tistory.com/268)
-   [[BBlog mdx] Nextjs + 마크다운으로 블로그를 작성해보자 - 1](https://hbyun.tistory.com/267)
-   [[Nextjs 14.2] ERR_REQUIRE_ESM 오류를 해결해보자](https://hbyun.tistory.com/275)

---

# Table information for supabase

# comments

| Column Name | Data Type      |
| ----------- | -------------- |
| id          | bigint (int8)  |
| upper_id    | bigint (int8)  |
| context     | text           |
| user_id     | uuid           |
| post        | text           |
| created_at  | timestamptz    |
| updated_at  | timestamptz    |
| deleted     | boolean (bool) |
| avatar      | text           |
| username    | text           |

# errors

| Column Name | Data Type                              |
| ----------- | -------------------------------------- |
| id          | bigint (int8)                          |
| created_at  | timestamp with time zone (timestamptz) |
| error       | text                                   |

# post

| Column Name | Data Type                |
| ----------- | ------------------------ |
| id          | bigint (int8)            |
| post        | text                     |
| created_at  | timestamp with time zone |

# visitors

| ip         | text                     |
| ---------- | ------------------------ |
| url        | text                     |
| visit_date | timestamp with time zone |
