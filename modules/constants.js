import path from 'path';
import { fileURLToPath } from 'url';
import os  from 'os';
import { stat } from 'fs/promises';
import { captureRejectionSymbol } from 'events';

export const __homedir = os.homedir();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const root = (os.platform() === "win32") ? `${process.cwd().split(path.sep)[0]}\\` : "/";


export const isExist = async (userPath) => {
  try {
    await fs.access(userPath);
  } catch {
    return false;
  }
  return true;
}

export const isDirExists = async (userPath) => (await stat(userPath)).isDirectory();

export const isFileExists = async (userPath) => (await stat(userPath)).isFile();

export const checkArgsCount = (count) => (userArgs) => {
  if (Object.keys(userArgs).length !== count) {
    throw new Error ('Invalid input');
  }
}