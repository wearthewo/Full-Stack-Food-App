FROM node:18-alpine

WORKDIR /app 
# Make sure dev dependencies like Vite are installed
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install 


COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
