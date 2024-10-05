# Template
-   개발 하면서 공통으로 쓸만한 것들을 모아두는 레포지토리
-   여하튼 매번 같은 세팅을 하는데 ..
-   귀찮으니 미리 하나 공통으로 만들어 두자

# 기술 스택
-   nextjs 14 / typescript
-   shadcn ui / zustand / mdx
-   prettier / eslint / FSD
-   cloudflare R2 (aws s3) / aws cognito / next-auth
-   github action script

# 기능
-   video player
-   theme selector
-   go-to-top component
-   start rating component
-   tooltip button wrapper component
-   horizontal vertical scroll status component
-   AWS Cognito user login/register
-   MDX Renderer with custom components
-   Image Upload

# Github Action enviroment (secrets)
- ENV_TEXT nextjs의 .env로 생성될 파일 (.env.template 참조)
- HOST_IP : 서버 주소
- HOST_USERNAME : 서버 유저이름
- PEM_KEY : 서버 PEM키
- PROJECT_NAME : 프로젝트 이름
- PROJECT_PORT : 프로젝트가 바인딩될 포트
