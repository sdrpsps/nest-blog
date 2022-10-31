FROM node:16-alpine as builder

ENV NODE_ENV build

# USER node
WORKDIR /home/node

COPY package*.json ./
COPY prisma ./prisma/ 
RUN npm install

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

# ---

FROM node:16-alpine

ENV NODE_ENV production
ENV DATABASE_URL mysql://blog:4hzzATYrrETe6j56@20.196.213.37:3306/blog
ENV SHADOW_DATABASE_URL mysql://blog:xf3hnhxst7TBTHX2@120.76.175.16:3306/blog
ENV TOKEN_SECRET afasfailihjln
ENV ARTICLE_PAGE_ROW 10

# USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/prisma ./prisma

CMD ["npm", "run", "start:prod"]