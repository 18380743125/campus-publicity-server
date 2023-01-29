import * as fs from 'fs';

// 删除文件
export function delFile(filepath) {
  const isExists = fs.existsSync(filepath);
  if (isExists) {
    fs.unlinkSync(filepath);
  }
}
