import { readdir } from "fs/promises";
import { __dirname, isExist, root, checkArgsCount, isDirExists } from "./constants.js";
import path from 'path';

export const ls = async (userPath, userArgs) => {
  checkArgsCount(0)(userArgs);
  const files = await readdir(userPath);

  files.forEach(file => console.log(file));
}

export const up = async (userPath, userArgs) => {
  checkArgsCount(0)(userArgs);
  
  if (userPath === root) {
    console.log(`You are already in ${userPath}`);
    return userPath;
  }
  
  const parentPath = path.join(userPath, '..');
  console.log(`You are currently in ${parentPath}`);

  return parentPath;
  
}

export const cd = async (userPath, userArgs) => {
  checkArgsCount(userArgs, 1);
  const newPath = path.resolve(userPath, userArgs['0']);

  const exists = await isExist(newPath);
  const dirExists = await isDirExists(newPath);

  console.log({
    newPath, exists, dirExists 
  });

  if (!exists) {
    throw new Error('No such directory');
  }

  if (!dirExists) {
    throw new Error('The specified path contains a file, not a directory');
  }

  return newPath;
}