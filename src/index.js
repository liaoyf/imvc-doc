#!/usr/bin/env node
const path = require("path")
const jsdoc2md = require("jsdoc-to-markdown")
const util = require("./utils")
const template = require("./template")
const chalk = require("chalk")
const logError = msg => console.log(chalk.red(msg))
const logSuccess = msg => console.log(chalk.green(msg))
const logWarn = msg => console.log(chalk.yellow(msg))
async function createFileMD(projectPath, basePath, fileNames) {
    const paths = util.findFilePath(projectPath, fileNames)
    let doActions = [],
        mdPaths = []
    for (let p of paths) {
        let options = {
            files: [p.path]
        }
        let mdDir = path.join(p.dir, "docs")
        let mdName = `${p.name}.md`
        let pageName = path.basename(p.dir)
        let mdPath = path.join(mdDir, mdName).replace(basePath, "")
        doActions.push(
            jsdoc2md
                .render(options)
                .then(async output => {
                    if (output) {
                        await util.writeFile(mdDir, mdName, output)
                        mdPaths.push({
                            fileName: p.name,
                            pageName,
                            mdPath
                        })
                    } else {
                        throw "empty"
                    }
                })
                .catch(e => {
                    logWarn(`${p.path} [fail]`)
                })
        )
    }
    await Promise.all(doActions)
    return mdPaths
}
async function createMD(basePath) {
    let srcPath = path.join(basePath, "src")
    let docConfig = require(path.join(basePath, 'doc.config.js'))
    let [shareCtrMDPaths, ctrMDPaths] = await Promise.all([
        createFileMD(srcPath, basePath, docConfig.shareCtrNames||["BaseController.js"]),
        createFileMD(srcPath, basePath, docConfig.pageCtrNames||["controller.js"])
    ])
    await util.writeFile(
        basePath,
        "README.md",
        template({ basePath, ctrMDPaths, shareCtrMDPaths })
    )
    logSuccess("doc finish")
}

const program = require("commander")
program
    .version("0.0.1")
    .option(
        "-p, --project-path <name>",
        "项目路径 绝对路径"
    )

program
    .command("docs")
    .description("生成文档")
    .action(args => {
        createMD(program.projectPath || process.cwd())
    })
program.parse(process.argv)
