# eggjs
## koa的不足
* 分层实现 - 复杂业务问题
* 约定优于定义 - 如vue中使用nuxt.js

## egg
创建egg项目
```
$ npm i egg-init -g
$ egg-init egg --type=simple
```
### 基本使用方法
三层分层实现 Controller Service Model
#### Controller层
在router.js新增一个路由
```
router.get('/user', controller.user.index)
```

新建controller/user.js，返回数据通过ctx.body返回与koa相同
```
const {Controller} = require('egg')

class UserController extends Controller {
    async index() {
        this.ctx.body = {
            name: '123'
        }
    }
}

module.exports = UserController
```
#### Service层
新建service/user.js
```
const {Service} = require('egg')

class UserService extends Service {
    async getUserInfo() {
        return {
            name: 'Service'
        }
    }
}
module.exports = UserService
```

controller/user.js
```
    const {ctx , service} = this
    ctx.body = await service.user.getUserInfo()
```
#### model层
```
npm install -s egg-sequelize mysql2
```

docker-compose.yml
```
version: "2"
services:
    mysql:
        image: mysql
        restart: always
        ports:
            - "3306:3306"
        environment:
            - MYSQL_ROOT_PASSWORD=Ymslx-2020
    adminer:
        image: adminer
        restart: always
        ports:
            - 8080:8080
```
启动docker环境
```
$ docker-compose up -d
```

config/plugin.js 注册egg-sequelize插件
```
sequelize: {
    enable: true,
    package: 'egg-sequelize',
}
```
在config/config.default.js中编写 sequelize配置
```
// const userConfig中
sequelize: {
    dialect: "mysql",
    host: '123.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'kkb'
}
```

编写模型 app/model/user.js
```
module.exports = app => {
    const { STRING } = app.Sequelize;

    const User = app.model.define(
        "user",
        { name: STRING(30) },
        { timestamps: false }
    );

    // 数据库同步
    User.sync({force: true})

    return User;
}
```
调用模型 service/user.js
```
    return await this.ctx.model.User.findAll()
```

