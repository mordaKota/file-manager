import os from "os";
import { __dirname, checkArgsCount } from "./constants.js";


export const getOsInfo = async (userPath, userArgs) => {
  checkArgsCount(1)(userArgs);

  switch (userArgs[0]) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      console.log(os.cpus());
      break;
    
    case '--homedir':
      console.log(os.homedir());
      break;
      
    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture':
      console.log(os.arch());
      break;

    default:
      console.warn(`Unexpected command argument: ${userArgs[0]}`);
      break;
  }
}


