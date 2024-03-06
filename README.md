![preview](https://github.com/B-HS/BBlog/assets/49316060/ddee7e0a-5291-42b2-9955-107ea67fc60e)


## BBlog
---
- Nexjts
- Supabase
- shadcn/ui
- tailwind
---

## rust 배우고 난 후 wasm으로 재구현할 부분
- 파일 입출력(특히 블로그 글 읽기부분)
- 검색용 유틸(rkaskan>감나무 의 한글변환 및 역변환 + 토큰추출(이건 다른 곳 로직 참조))

## 업데이트 예정 내역
- ~~이미지를 무조건 public을 보는게 아니라 절대경로로 보기 (r2도 쓰게끔하기 위해서)~~
- ~~위의 사항이 안되면 git명령어를 자동화하기~~
- ~~tile 컴포넌트 이미지부분 max width 설정~~
- ~~임시저장~~
- ~~페이지 최적화(LCP, metatag 등등)~~
- ~~TOC~~
- git action을 쓰던 뭘 해서 빌드도 자동화하기
- 기타 잡스러운 버그 쓰면서 나오면 수정

# 4월부터 보수 시작

- [[BBlog mdx] Nextjs + 마크다운으로 블로그를 작성해보자 - 2](https://hbyun.tistory.com/268)
- [[BBlog mdx] Nextjs + 마크다운으로 블로그를 작성해보자 - 1](https://hbyun.tistory.com/267)


---


# Table information for supabase


# comments

Column Name | Data Type
-- | --
id | bigint (int8)
upper_id | bigint (int8)
context | text
user_id | uuid
post | text
created_at | timestamptz
updated_at | timestamptz
deleted | boolean (bool)
avatar | text
username | text

# errors

Column Name | Data Type
-- | --
id | bigint (int8)
created_at | timestamp with time zone (timestamptz)
error | text


# post

Column Name | Data Type
-- | --
id | bigint (int8)
post | text
created_at | timestamp with time zone

# visitors

ip | text
-- | --
url | text
visit_date | timestamp with time zone



