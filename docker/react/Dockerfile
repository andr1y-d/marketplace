FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install \
  && npm install redux react-redux @reduxjs/toolkit \
  && npm install -D react-router-dom \
  && npm install sass \
  && npm install formik yup \
  && npm install embla-carousel-react \
  && npm install dayjs



COPY . .

CMD ["npm", "start"]