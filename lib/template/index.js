"use strict";

var path = require("path");

function ctrMD(mdPaths) {
  return "## \u9875\u9762\n\n".concat(mdPaths.map(function (md) {
    return "#### ".concat(md.pageName, " [Controller](").concat(md.mdPath, ")");
  }).join("\n\n"), "\n    ");
}

function ctrBaseMD(shareCtrMDPaths) {
  return "## Share\n\n".concat(shareCtrMDPaths.map(function (md) {
    return "#### [".concat(md.fileName, "](").concat(md.mdPath, ")");
  }).join('\n\n'), "\n    ");
}

function createMD(_ref) {
  var basePath = _ref.basePath,
      ctrMDPaths = _ref.ctrMDPaths,
      shareCtrMDPaths = _ref.shareCtrMDPaths;

  var docConfig = require(path.join(basePath, "doc.config.js"));

  var defaultMD = docConfig && docConfig.defaultMD || "";
  return "".concat(defaultMD, "\n").concat(ctrBaseMD(shareCtrMDPaths), "\n").concat(ctrMD(ctrMDPaths), "\n    ");
}

module.exports = createMD;