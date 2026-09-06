# Vercel 배포 실패 — bun.lock lockfileVersion 2 를 Vercel 의 bun 1.3.14 가 읽지 못함 (2026-09-06)

## 증상

pnpm → bun 전환 커밋(d43c1b6) 이후 첫 프로덕션 배포(dpl_FKigJdVUP3PeZ7nBCXqUh1CKxty4)가 ERROR. 빌드 로그:

```
bun install v1.3.14
error: Unknown lockfile version  (bun.lock:2  "lockfileVersion": 2)
warn: Ignoring lockfile
...
+ next@16.3.4
> Build error occurred
Error: ENOENT: no such file or directory, open '/vercel/path0/.next/next-server.js.nft.json'
```

## 원인

- 로컬 bun 1.4.2 는 `bun.lock` 을 `lockfileVersion: 2` 로 쓴다. Vercel 빌드 이미지의 bun 은 1.3.14 라 이 형식을 파싱하지 못하고 락파일을 무시한 채 의존성을 다시 해석했다.
- 그 결과 next 가 16.2.10 → 16.3.4 등으로 올라갔고, Vercel 의 `onBuildComplete` 단계가 `.next/next-server.js.nft.json` 을 찾지 못해 실패했다. 직전 성공 배포(7e65fa7)와의 차이는 이 의존성 변동뿐이다.
- Vercel 은 bun 버전을 락파일 존재 여부로만 정한다(`bun.lock` → 이미지의 bun). `packageManager` 필드는 Corepack 용이고 Corepack 은 bun 을 지원하지 않으므로 bun 버전을 올릴 수 없다. (https://vercel.com/docs/package-managers)

## 해결

- bun 1.3.14 바이너리로 `pnpm-lock.yaml` 을 다시 마이그레이션해 `lockfileVersion: 1` 형식의 `bun.lock` 을 생성했다(해석 버전은 동일: next 16.2.10, @vercel/analytics 2.0.1). 커밋 4fb4dfa.
- 실험으로 확인한 사실: bun 1.4.2 는 v1 락파일에 대해 `bun install` · `bun add` · `bun remove` 를 해도 `lockfileVersion: 1` 을 유지한다(scratch 에서 add/remove 후 원본과 바이트 동일). 따라서 평소 작업에서는 형식이 바뀌지 않는다.

## 운영 규칙

- `bun.lock` 첫 줄의 `lockfileVersion` 은 Vercel 이미지의 bun 이 1.4 이상이 될 때까지 **1 을 유지**한다. 커밋 전 `head -2 bun.lock` 으로 확인한다.
- 만약 2 로 바뀌면: bun 1.3.14 공식 릴리스(https://github.com/oven-sh/bun/releases/download/bun-v1.3.14/bun-darwin-aarch64.zip)를 scratch 에 받아 `bun install --lockfile-only` 로 다시 생성한다. 이때 v2 락파일은 무시되므로, 버전 고정을 원하면 v1 락파일이 있는 커밋에서 시작해 `bun add` 로 변경분만 반영한다.
