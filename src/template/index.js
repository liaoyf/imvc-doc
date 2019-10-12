const path = require("path")
function ctrMD(mdPaths) {
    return `## 页面

${mdPaths
    .map(md => `#### ${md.pageName} [Controller](${md.mdPath})`)
    .join("\n\n")}
    `
}

function ctrBaseMD(shareCtrMDPaths) {
    return `## Share

${shareCtrMDPaths.map(md => `#### [${md.fileName}](${md.mdPath})`).join('\n\n')}
    `
}
function createMD({ basePath, ctrMDPaths, shareCtrMDPaths }) {
    let docConfig = require(path.join(basePath, "doc.config.js"))
    let defaultMD = (docConfig && docConfig.defaultMD) || ""
    return `${defaultMD}
${ctrBaseMD(shareCtrMDPaths)}
${ctrMD(ctrMDPaths)}
    `
}

module.exports = createMD
