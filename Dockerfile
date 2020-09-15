FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build
CMD ["npm", "run", "pm2"]
EXPOSE 3000


#PORT=
#ORIGIN=
#COOKIE_SECRET=
#SEQUELIZE_USERNAME=
#SEQUELIZE_PASSWORD=
#SEQUELIZE_DATABASE=
#SEQUELIZE_HOST=
#S3_ACCESS_KEY=
#S3_SECRET_ACCESS_KEY=
#S3_REGION=