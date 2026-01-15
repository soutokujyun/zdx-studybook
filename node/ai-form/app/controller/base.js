'use strict';

// 定制规范
const { Controller } = require('egg');

class BaseController extends Controller {
  success(data, status = 10001) {
    const token = this.ctx.state.token;
    if (token) {
      this.ctx.body = {
        code: 10003,
        data,
        token,
      };
    } else {
      this.ctx.body = {
        code: status,
        data,
      };
    }
  }

  message(message, status = 10000) {
    this.ctx.body = {
      code: status,
      message,
    };
  }

  error(message, errors = {}, status = 10002) {
    this.ctx.body = {
      code: status,
      message,
      errors,
    };
  }
}

module.exports = BaseController;
