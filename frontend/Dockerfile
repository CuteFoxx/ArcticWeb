FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

ENV BACKEND_URL=""
ENV NEXT_PUBLIC_API_URL=""

CMD [ "npm", "run", "dev", "--", "-H", "0.0.0.0", "--webpack" ]

# --- Production ---
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

ARG BACKEND_URL=""
ARG NEXT_PUBLIC_API_URL=""
ENV BACKEND_URL=$BACKEND_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV BACKEND_URL=""
ENV NEXT_PUBLIC_API_URL=""
ENV NODE_ENV=production

EXPOSE 3000

CMD [ "node", "server.js" ]
