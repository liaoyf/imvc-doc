#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require("path");

var jsdoc2md = require("jsdoc-to-markdown");

var util = require("./utils");

var template = require("./template");

var chalk = require("chalk");

var logError = function logError(msg) {
  return console.log(chalk.red(msg));
};

var logSuccess = function logSuccess(msg) {
  return console.log(chalk.green(msg));
};

var logWarn = function logWarn(msg) {
  return console.log(chalk.yellow(msg));
};

function createFileMD(_x, _x2, _x3) {
  return _createFileMD.apply(this, arguments);
}

function _createFileMD() {
  _createFileMD = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(projectPath, basePath, fileName) {
    var paths, doActions, mdPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paths = util.findFilePath(projectPath, [fileName]);
            doActions = [], mdPaths = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 5;

            _loop = function _loop() {
              var p = _step.value;
              var options = {
                files: [p.path]
              };
              var mdDir = path.join(p.dir, "docs");
              var mdName = "".concat(p.name, ".md");
              var pageName = path.basename(p.dir);
              var mdPath = path.join(mdDir, mdName).replace(basePath, "");
              doActions.push(jsdoc2md.render(options).then(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(output) {
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!output) {
                            _context.next = 6;
                            break;
                          }

                          _context.next = 3;
                          return util.writeFile(mdDir, mdName, output);

                        case 3:
                          mdPaths.push({
                            pageName: pageName,
                            mdPath: mdPath
                          });
                          _context.next = 7;
                          break;

                        case 6:
                          throw "empty";

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }())["catch"](function (e) {
                logWarn("".concat(p.path, " [fail]"));
              }));
            };

            for (_iterator = paths[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }

            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 14:
            _context2.prev = 14;
            _context2.prev = 15;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 17:
            _context2.prev = 17;

            if (!_didIteratorError) {
              _context2.next = 20;
              break;
            }

            throw _iteratorError;

          case 20:
            return _context2.finish(17);

          case 21:
            return _context2.finish(14);

          case 22:
            _context2.next = 24;
            return Promise.all(doActions);

          case 24:
            return _context2.abrupt("return", mdPaths);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 10, 14, 22], [15,, 17, 21]]);
  }));
  return _createFileMD.apply(this, arguments);
}

function createMD(_x4) {
  return _createMD.apply(this, arguments);
}

function _createMD() {
  _createMD = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(basePath) {
    var srcPath, _ref2, _ref3, baseCtrMDPaths, ctrMDPaths;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            srcPath = path.join(basePath, "src");
            _context3.next = 3;
            return Promise.all([createFileMD(srcPath, basePath, "BaseController.js"), createFileMD(srcPath, basePath, "controller.js")]);

          case 3:
            _ref2 = _context3.sent;
            _ref3 = (0, _slicedToArray2["default"])(_ref2, 2);
            baseCtrMDPaths = _ref3[0];
            ctrMDPaths = _ref3[1];
            _context3.next = 9;
            return util.writeFile(basePath, "README.md", template({
              basePath: basePath,
              ctrMDPaths: ctrMDPaths,
              baseCtrMDPaths: baseCtrMDPaths
            }));

          case 9:
            logSuccess("doc finish");

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createMD.apply(this, arguments);
}

var program = require("commander");

program.version("0.0.1").option("-p, --project-path <name>", "项目路径 绝对路径");
program.command("docs").description("生成文档").action(function (args) {
  createMD(program.projectPath);
});
program.parse(process.argv);