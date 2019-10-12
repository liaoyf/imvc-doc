const fs = require("fs")
const path = require("path")
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function findPathSync(startPath) {
    let result = []
    function finder(dir) {
        let files = fs.readdirSync(dir)
        files.forEach((val, index) => {
            let fPath = path.join(dir, val)
            let stats = fs.statSync(fPath)
            if (stats.isDirectory()) finder(fPath)
            if (stats.isFile()) result.push(fPath)
        })
    }
    finder(startPath)
    return result
}
exports.findPathSync = findPathSync

function findFilePath(ppath, fileNames) {
    return findPathSync(ppath).reduce((pre, p) => {
        let name = path.parse(p).name
        let base = path.parse(p).base
        if (fileNames.indexOf(base) > -1) {
            let dir = path.dirname(p)
            pre.push({
                path: p,
                name,
                dir
            })
        }
        return pre
    }, [])
}

exports.findFilePath = findFilePath

async function writeFile(dirPath,fileName,content) {
    await createDir(dirPath)
    let filePath = path.join(dirPath,fileName)
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, err => {
            if (err) {
                reject(`写${filePath}文件失败`)
            } else {
                resolve()
            }
        })
    })
}
exports.writeFile = writeFile
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false)
            } else {
                resolve(stats)
            }
        })
    })
}
/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}
/**
 *  创建路径
 * @param {string} dir 路径
 */
async function createDir(dir) {
    let isExists = await getStat(dir)
    //如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
        return true
    } else if (isExists) {
        //如果该路径存在但是文件，返回false
        return false
    }
    //如果该路径不存在
    let tempDir = path.parse(dir).dir //拿到上级路径
    //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    let status = await createDir(tempDir)
    let mkdirStatus
    if (status) {
        mkdirStatus = await mkdir(dir)
    }
    return mkdirStatus
}
exports.createDir = createDir
