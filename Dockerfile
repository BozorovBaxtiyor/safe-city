FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Agar build kerak bo'lsa (masalan, NestJS uchun)
RUN npm run build

EXPOSE 7001

CMD ["npm", "run", "start:prod"]