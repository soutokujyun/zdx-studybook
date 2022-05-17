# Docker

## docker 配置

### Ngnix 配置

在./ngnix 目录下创建 conf.d 文件夹，然后创建 ngnix.conf  
/ngnix/conf.d/ngnix.conf

```
server {
    listen 80;
    location / {
        root /var/www/html;
        index index.html index.htm;
    }
    location ~ \.(gif|jpg|png)$ {
        root /static;
        index index.html index.htm;
    }
    location /api {
        proxy_pass http://app-pm2:3000;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For        $proxy_add_x_forwarded_for;
    }
}
```

开启

```
# docker bulid -t nginx:dingzhi .
# docker run -p 8000:80 nginx:dingzhi
```

### Web 端配置

创建 Dockerfile  
/web/Dockerfile

```
FROM node:latest

# 将当前目录移动到/usr/local/web/
ADD . /usr/local/web/
# 相当于cd ./app 进入/usr/local/web/目录
WORKDIR /usr/local/web/element-system
RUN echo 'deb http://mirrors.163.com/debian/ stretch main non-free contrib' > /etc/apt/sources.list &&\
    echo 'deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib' >> /etc/apt/sources.list &&\
    echo 'deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib' >> /etc/apt/sources.list &&\
    apt-get update && apt-get install -y \
    # node-sass依赖包
    gcc g++ python \
    vim \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN true \
    && npm config set registry https://registry.npm.taobao.org && \
    npm install
EXPOSE 8080
CMD [ "npm", "run", "serve" ]
```

启动

```
# docker bulid -t web:server .
# docker run -p 8080:8080 -v $PWD/element-system/src:/usr/local/web/element-system/src -itd web:serve
```

### Server 环境 Dockerfile 配置

创建 server 文件夹 创建 Dockerfile 文件  
/server/Dockerfile

```
FROM keymetrics/pm2:latest-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN true && \
    npm config set registry https://registry.npm.taobao.org && \
    npm i
EXPOSE 3000
CMD ["pm2-runtime", "start",  "process.yml"]
```

/server/process.yml

```
apps:
  - script : app.js
  # 启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目
  instances: 2
  # 监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
  watch : true
  env :
    NODE_ENV: production
```

### Redis 服务配置

/redis/conf/redis.conf

```
# bind 127.0.0.1
daemonize no
requirepass Ymslx-2021
appendonly yes
tcp-keepalive 300
```

### Mysql 服务配置

/mysql/conf/my.cnf

```
# Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

#
# The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

# Custom config should go here
!includedir /etc/mysql/conf.d/
```

启动远程连接

```
# mysql -uroot -p123456
# use mysql;
# grant all privileges on *.* to 'root'@'%';
# ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; #修改root用户密码
# select Host,User,plugin from user;
# flush privileges;
```

## adnuber 数据库可视化

```
adminer:
        image: adminer
        restart: always
        ports:
            - 8080:8080
```

## 使用 docker-compose

```
version: "3.1"
services:
    nginx:
        restart: always
        image: nginx
        ports:
            - 8091:80
        volumes:
            - ./nginx/conf.d/:/etc/nginx/conf.d
            - ./web/dist:/var/www/html/
            - ./static/:/static/
    web:
        build:
            context: ./web
            dockerfile: Dockerfile
            ports:
                - "8080:8080"
            volumes:
                - "./web/element-system/src:/usr/local/web/element-system/src"
    app-pm2:
        build:
            context: ./server
            dockerfile: Dockerfile
        ports:
            - "3000:3000"
        volumes:
            - "./server/run:/usr/local/server/run"
    redis:
        image: redis
        restart: always
        ports:
            - "6379:6379"
        volumes:
            - "./redis/conf/redis.conf:/etc/redis/redis.conf"
            - "./redis/data:/data"
    mysql:
        image: mysql
        restart: always
        ports:
            - "3306:3306"
        environment:
            - MYSQL_ROOT_PASSWORD=Ymslx-2020
        volumes:
            - "./mysql/data:/var/lib/mysql"
            - "./mysql/conf/my.cnf:/etc/mysql/my.cnf"
    adminer:
        image: adminer
        restart: always
        ports:
            - 8081:8081
```

运行命令

```
# docker-compose build --no-cache
# docker-compose up -d
# docker-compose stop
# docker-compose ps// list the containers
```
