const path = require("path")
function ctrMD(mdPaths) {
    return `## 页面Controller

${mdPaths
    .map(md => `#### ${md.pageName} [Controller](${md.mdPath})`)
    .join("\n\n")}
    `
}

function ctrBaseMD(baseCtrMDPaths) {
    return `## BaseController

${baseCtrMDPaths
    .map(md => `#### ${md.pageName} [BaseController](${md.mdPath})`)
    .join("\n\n")}
    `
}
function createMD({ basePath, ctrMDPaths, baseCtrMDPaths }) {
    let docConfig = require(path.join(basePath, "doc.config.js"))
    let defaultMD = (docConfig && docConfig.defaultMD) || ""
    return `${defaultMD}
${ctrBaseMD(baseCtrMDPaths)}
${ctrMD(ctrMDPaths)}
    `
}

module.exports = createMD
