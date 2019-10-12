"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require("fs");

var path = require("path");
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */


function findPathSync(startPath) {
  var result = [];

  function finder(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function (val, index) {
      var fPath = path.join(dir, val);
      var stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });
  }

  finder(startPath);
  return result;
}

exports.findPathSync = findPathSync;

function findFilePath(ppath, fileNames) {
  return findPathSync(ppath).reduce(function (pre, p) {
    var name = path.parse(p).name;
    var base = path.parse(p).base;

    if (fileNames.indexOf(base) > -1) {
      var dir = path.dirname(p);
      pre.push({
        path: p,
        name: name,
        dir: dir
      });
    }

    return pre;
  }, []);
}

exports.findFilePath = findFilePath;

function writeFile(_x, _x2, _x3) {
  return _writeFile.apply(this, arguments);
}

function _writeFile() {
  _writeFile = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(dirPath, fileName, content) {
    var filePath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return createDir(dirPath);

          case 2:
            filePath = path.join(dirPath, fileName);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              fs.writeFile(filePath, content, function (err) {
                if (err) {
                  reject("\u5199".concat(filePath, "\u6587\u4EF6\u5931\u8D25"));
                } else {
                  resolve();
                }
              });
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _writeFile.apply(this, arguments);
}

exports.writeFile = writeFile;
/**
 * 读取路径信息
 * @param {string} path 路径
 */

function getStat(path) {
  return new Promise(function (resolve, reject) {
    fs.stat(path, function (err, stats) {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}
/**
 * 创建路径
 * @param {string} dir 路径
 */


function mkdir(dir) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(dir, function (err) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
/**
 *  创建路径
 * @param {string} dir 路径
 */


function createDir(_x4) {
  return _createDir.apply(this, arguments);
}

function _createDir() {
  _createDir = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dir) {
    var isExists, tempDir, status, mkdirStatus;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getStat(dir);

          case 2:
            isExists = _context2.sent;

            if (!(isExists && isExists.isDirectory())) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", true);

          case 7:
            if (!isExists) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", false);

          case 9:
            //如果该路径不存在
            tempDir = path.parse(dir).dir; //拿到上级路径
            //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在

            _context2.next = 12;
            return createDir(tempDir);

          case 12:
            status = _context2.sent;

            if (!status) {
              _context2.next = 17;
              break;
            }

            _context2.next = 16;
            return mkdir(dir);

          case 16:
            mkdirStatus = _context2.sent;

          case 17:
            return _context2.abrupt("return", mkdirStatus);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createDir.apply(this, arguments);
}

exports.createDir = createDir;