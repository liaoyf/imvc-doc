"use strict";

var path = require("path");

function ctrMD(mdPaths) {
  return "## \u9875\u9762Controller\n\n".concat(mdPaths.map(function (md) {
    return "#### ".concat(md.pageName, " [Controller](").concat(md.mdPath, ")");
  }).join("\n\n"), "\n    ");
}

function ctrBaseMD(baseCtrMDPaths) {
  return "## BaseController\n\n".concat(baseCtrMDPaths.map(function (md) {
    return "#### ".concat(md.pageName, " [BaseController](").concat(md.mdPath, ")");
  }).join("\n\n"), "\n    ");
}

function createMD(_ref) {
  var basePath = _ref.basePath,
      ctrMDPaths = _ref.ctrMDPaths,
      baseCtrMDPaths = _ref.baseCtrMDPaths;

  var docConfig = require(path.join(basePath, "doc.config.js"));

  var defaultMD = docConfig && docConfig.defaultMD || "";
  return "".concat(defaultMD, "\n").concat(ctrBaseMD(baseCtrMDPaths), "\n").concat(ctrMD(ctrMDPaths), "\n    ");
}

module.exports = createMD;