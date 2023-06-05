FROM node:18
WORKDIR /app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/
RUN npm install
RUN npx prisma generate --schema=./prisma/schema.prisma
COPY . .
CMD [ "npm", "run", "start:dev" ]