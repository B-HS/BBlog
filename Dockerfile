FROM node:20-alpine AS runner

WORKDIR /usr/src/app

COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV=production

RUN npm install -g pm2

CMD ["pm2-runtime", "server.js", "-i", "max"]