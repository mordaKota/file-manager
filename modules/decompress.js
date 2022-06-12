import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import { __dirname, isExist, checkArgsCount, isFileExists, isDirExists } from "./constants.js";

export const decompress = async (userPath, userArgs) => {
  checkArgsCount(2)(userArgs);
  const readFilePath = path.resolve(userPath, userArgs['0']);

  const getNewFileName = (filePath) => {
    const fileNameX = path.parse(filePath).base.split('.')
    const ext = fileNameX.pop();
    return fileNameX.join('.');
  } 

  const newFileName = getNewFileName(readFilePath);
  const writeFilePath = path.resolve(userPath, userArgs['1'], newFileName);

  if (!await isExist(readFilePath)) {
    throw new Error('Operations fail: No such source file');
  }

  if (!await isExist(path.resolve(userPath, userArgs['1']))) {
    throw new Error('Operations fail: No such destination folder');
  }

  if (!await isFileExists(readFilePath)) {
    throw new Error('Operations fail: The source file is not a file');
  }

  if (!await isDirExists(path.resolve(userPath, userArgs['1']))) {
    throw new Error('Operations fail: The destination folder is not a folder');
  }

  if (await isExist(writeFilePath)) {
    throw new Error('Operations fail: The file already exists in the destination folder');
  }

  const readStream = createReadStream(readFilePath);
  const writeStream = createWriteStream(writeFilePath);
  const brotli = zlib.createBrotliDecompress();

  await pipeline(readStream, brotli, writeStream);
};