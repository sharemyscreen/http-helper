const _ = require('lodash');
const changeCase = require('change-case');

function toSnakeCase (obj) {
  if (obj instanceof Array) {
    const newArray = [];
    obj.forEach(function (elem) {
      newArray.push(toSnakeCase(elem));
    });
    obj = newArray;
  } else {
    _.forIn(obj, function (value, key) {
      if (value instanceof Array) {
        const newArray = [];
        value.forEach(function (entry) {
          newArray.push(toSnakeCase(entry));
        });
      } else if (value instanceof Object) {
        value = toSnakeCase(value);
      }
      delete obj[key];
      obj[changeCase.snakeCase(key)] = value;
    });
  }

  return obj;
}

function sendReply (res, statusCode, body) {
  if (statusCode instanceof Object) {
    body = {
      code: statusCode.code,
      subCode: statusCode.subCode,
      message: statusCode.message
    };
    statusCode = statusCode.httpCode;
  }
  body = body ? toSnakeCase(body) : '';
  res.status(statusCode).json(body);
}

module.exports.toSnakeCase = toSnakeCase;
module.exports.sendReply = sendReply;
