import { readFile } from 'node:fs/promises';
const { createHash } = await import('node:crypto');
import path from 'path';
import { __dirname, isExist, checkArgsCount, isFileExists, isDirExists } from "./constants.js";

export const hash = async (userPath, userArgs) => {
  checkArgsCount(1)(userArgs);
  const filePath = path.resolve(userPath, userArgs['0']);

  if (!await isExist(filePath)) {
    throw new Error('Operations fail: No such file');
  }

  if (!await isFileExists(filePath)) {
    throw new Error('Operations fail: The specified path contains the folder, not file');
  }

  const content = await readFile(filePath, 'utf8');
  const crypto = createHash('sha256');
  console.log(crypto.update(content).digest('hex'));
}
