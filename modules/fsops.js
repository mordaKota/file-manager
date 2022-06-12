import { createReadStream, createWriteStream } from "fs";
import { __dirname, isExist, checkArgsCount, isFileExists, isDirExists } from "./constants.js";
import path from 'path';
import { writeFile, rename, copyFile, rm as remove } from "fs/promises";

export const read = async (userPath, userArgs) => {
  checkArgsCount(1)(userArgs);
  const filePath = path.resolve(userPath, userArgs['0']);

  const exists = await isExist(filePath);
  const fileExists = await isFileExists(filePath);

  if (!exists) {
    throw new Error('Operations fail: No such file');
  }

  if (!fileExists) {
    throw new Error('Operations fail: The specified path contains a directory, not a file');
  }

  const readStream = createReadStream(filePath);
  readStream.pipe(process.stdout);

  return new Promise((res) => {
    readStream.on("end", () => res());
  });
}

export const add = async (userPath, userArgs) => {
  checkArgsCount(1)(userArgs);
  const filePath = path.resolve(userPath, userArgs['0']);

  if (await isExist(filePath)) {
    throw new Error('Operations fail: The file already exists');
  }

  //await writeFile(filePath, '');
  createWriteStream(filePath);
}


export const rn = async (userPath, userArgs) => {
  checkArgsCount(2)(userArgs);
  const filePath = path.resolve(userPath, userArgs['0']);
  
  const newFilePath = path.resolve(userPath, userArgs['1'] + path.extname(userArgs['0']));

  if (!await isExist(filePath)) {
    throw new Error('Operations fail: No such file or directory');
  }

  if (await isExist(newFilePath)) {
    throw new Error('Operations fail: The specified name is already used for another file');
  }

  await rename(filePath, newFilePath);
}

export const cp = async (userPath, userArgs) => {
  checkArgsCount(2)(userArgs);
  const srcfilePath = path.resolve(userPath, userArgs['0']);
  const destDirPath = path.resolve(userPath, userArgs['1']);

  const destFileName = path.parse(srcfilePath).base;
  const destFilePath = path.join(destDirPath, destFileName);

  if (!await isExist(srcfilePath)) {
    throw new Error('Operation fail: No such source file');
  }

  if (!await isExist(destDirPath)) {
    throw new Error('Operation fail: No such destination folder');
  }

  if (!await isDirExists(destDirPath)) {
    throw new Error('Operation fail: The destination folder is not a folder');
  }

  if (!await isFileExists(srcfilePath)) {
    throw new Error('Operation fail: The source file is not a file');
  }

  if (await isExist(destFilePath)) {
    throw new Error('Operation fail: The file already exists in the destination folder');
  }

 //await copyFile (srcfilePath, destFilePath);
  const readStream = createReadStream(srcfilePath);
  const writeStream = createWriteStream(destFilePath);

  const result = new Promise((res) => readStream.on('end', () => res()));
  readStream.on('data', chunk => writeStream.write(chunk));

  return result;
}

export const mv = async (userPath, userArgs) => {
  checkArgsCount(2)(userArgs);
  const srcfilePath = path.resolve(userPath, userArgs['0']);
  const destDirPath = path.resolve(userPath, userArgs['1']);

  const destFileName = path.parse(srcfilePath).base;
  const destFilePath = path.join(destDirPath, destFileName);

  if (!await isExist(srcfilePath)) {
    throw new Error('Operation fail: No such source file');
  }

  if (!await isExist(destDirPath)) {
    throw new Error('Operation fail: No such destination folder');
  }

  if (!await isDirExists(destDirPath)) {
    throw new Error('Operation fail: The destination folder is not a folder');
  }

  if (!await isFileExists(srcfilePath)) {
    throw new Error('Operation fail: The source file is not a file');
  }

  if (await isExist(destFilePath)) {
    throw new Error('Operation fail: The file with such name already exists in the destination folder');
  }

  //await rename(srcfilePath, destFilePath);
  const readStream = createReadStream(srcfilePath);
  const writeStream = createWriteStream(destFilePath);

  const result = new Promise((res) => readStream.on('end', () => res()));
  readStream.on('data', chunk => writeStream.write(chunk));

  await result; 
  await remove(srcfilePath);
}

export const rm = async (userPath, userArgs) => {
  checkArgsCount(1)(userArgs);
  const filePath = path.resolve(userPath, userArgs['0']);

  if (!await isExist(filePath)) {
    throw new Error('Operation fail: No such file');
  }

  if (!await isFileExists(filePath)) {
    throw new Error('Operation fail: The specified path contains the folder, not file');
  }

  await remove(filePath);
}