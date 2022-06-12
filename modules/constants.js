import path from 'path';
import { fileURLToPath } from 'url';
import os  from 'os';
import { stat, access } from 'fs/promises';
import { captureRejectionSymbol } from 'events';

export const __homedir = os.homedir();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const root = (os.platform() === "win32") ? `${process.cwd().split(path.sep)[0]}\\` : "/";


export const isExist = async (userPath) => {
  try {
    await access(userPath);
  } catch(e) {
    return false;
  }
  return true;
}

export const isDirExists = async (userPath) => {
  try {
    return (await stat(userPath)).isDirectory();
  } catch {
    return false;
  }
}




export const isFileExists = async (userPath) => (await stat(userPath)).isFile();

export const checkArgsCount = (count) => (userArgs) => {
  if (Object.keys(userArgs).length !== count) {
    throw new Error ('Invalid input');
  }
}