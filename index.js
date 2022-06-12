//Run: npm run start -- --username=your_username
import { __dirname, __homedir, root} from "./modules/constants.js";
import { ls, up, cd} from  "./modules/nwd.js";
import { read, add, rn, cp, mv, rm } from "./modules/fsops.js"

let username = '';
let currentDir = __homedir;

const parseArgs = (args) => args.reduce((result, arg, index) => {
  const argX = arg.split('=');
  if (argX.length !== 2) {
    result[index] = argX[0];
    return result;
  }
  result[argX[0]] = argX[1];
  return result;
}, {});

const argsObject = parseArgs(process.argv.slice(2));

if ('--username' in argsObject) {
  username = argsObject['--username'];
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDir}.`);
} else {
  throw new Error('Please run the app with correct arguments');
}

const exit = () => {
  process.stdout.write(`Thank you for using File Manager, ${username}!`);
  process.exit();
}

const init = async () => {
  process.stdin.on('data', async userInput => {
    
    const userInputX = userInput.toString().trim().split(' ');

    let cmd = userInputX.shift();
    const args = parseArgs(userInputX);

    try {
      switch (cmd) {
        case 'up':
          currentDir = await up(currentDir, args);
          break;

        case 'cd':
          currentDir = await cd(currentDir, args);
          console.log(`You are currently in ${currentDir}`);
          break;
        
        case 'ls':
          await ls(currentDir, args);
          break;

        case 'cat':
          await read(currentDir, args);
          break;
        
        case 'add':
          await add (currentDir, args);
          break;
        
        case 'rn':
          await rn (currentDir, args);
          break;
        
        case 'cp':
          await cp (currentDir, args);
          break;
        
        case 'mv':
          await mv (currentDir, args);
          break;
        
        case 'rm':
          await rm (currentDir, args);
          break;
            
        case 'exit':
          exit();

        default:
          console.warn(`Unexpected command: ${cmd}`);
      } 
    } catch (e) {
      //console.error(`Error: ${e.message}`);
      console.error(e);
    }

  });
}

init();
process.on('SIGINT', exit);