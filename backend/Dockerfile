FROM --platform=linux/amd64 node:23-slim
COPY package.json ./package.json
RUN npm install --only=production
COPY build/src ./build/src
CMD ["npm", "start"]
