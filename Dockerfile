FROM node:21
LABEL author="Xen0Xys"

WORKDIR /home

COPY . .

RUN mkdir -p /home/data

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "start"]
