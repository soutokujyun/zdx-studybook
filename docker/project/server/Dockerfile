FROM keymetrics/pm2:latest-alpine
ADD . /usr/local/server
WORKDIR /usr/local/server
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install
EXPOSE 3000
#pm2在docker中使⽤命令为pm2-docker
CMD ["pm2-runtime", "start", "process.yml"]