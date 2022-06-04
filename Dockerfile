FROM node:lts-slim as dependencies
WORKDIR /apoidea-test
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-slim as builder
WORKDIR /apoidea-test
COPY . .
COPY --from=dependencies /apoidea-test/node_modules ./node_modules
RUN yarn build

FROM node:lts-slim as runner
WORKDIR /apoidea-test
ENV NODE_ENV production
COPY --from=builder /apoidea-test/public ./public
COPY --from=builder /apoidea-test/.next ./.next
COPY --from=builder /apoidea-test/node_modules ./node_modules
COPY --from=builder /apoidea-test/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]