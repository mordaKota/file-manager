import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';
import { __dirname, isExist, checkArgsCount, isFileExists, isDirExists } from "./constants.js";

export const compress = async (userPath, userArgs) => {
  checkArgsCount(2)(userArgs);
  
  const readFilePath = path.resolve(userPath, userArgs['0']);
  const writeFilePath = path.resolve(userPath, userArgs['1'], userArgs['0'] + '.br');

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
    throw new Error('Operations fail: The archive already exists in the destination folder');
  }

  const readStream = createReadStream(readFilePath);
  const writeStream = createWriteStream(writeFilePath);

  const brotli = zlib.createBrotliCompress();
  await pipeline(readStream, brotli, writeStream);
};