const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
// 脚本被执行的目录
const cwd = process.cwd();
// 待搜索目录
const searchDir = path.join(cwd, "src");
// 图片保存目录
const outputDir = path.join(cwd, "public", "assets");

const ORIGIN_PREFIX = "https://pss.bdstatic.com/static/superman/img/topnav/";
const REPLACE_PREFIX = "/assets/";

/**
 * 下载单个图片
 * @param {图片源地址} src
 */
function downloadImage(src, targetDir) {
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `curl --create-dirs -O --output-dir ${outputDir} ${src} `,
      (err, stdout, stderr) => {
        if (err) {
          console.error("", err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

/**
 * 获取指定文件夹下的所有文件
 * @param {*} dir
 * @returns
 */
function getFileList(dir, depth = false) {
  const fileList = [];
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && depth) {
      // 如果是目录，需要递归
      fileList.push(...getFileList(filePath, depth));
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

(async function () {
  const files = getFileList(searchDir, true);
  const outputFiles = getFileList(outputDir);
  const reg = new RegExp(`${ORIGIN_PREFIX}.*?(svg|png)`, "gi");
  try {
    for (const file of files) {
      let content = fs.readFileSync(file, "utf8");
      const urls = content.match(reg);
      if (Array.isArray(urls)) {
        for (const url of urls) {
          const fileName = url.replace(ORIGIN_PREFIX, "");
          const outputFileName = path.join(
            outputDir,
            url.replace(ORIGIN_PREFIX, "")
          );
          content = content.replace(url, `${REPLACE_PREFIX}${fileName}`);
          if (!outputFiles.includes(outputFileName)) {
            await downloadImage(url);
          }
        }
        fs.writeFileSync(file, content, "utf8");
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
