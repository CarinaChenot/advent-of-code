const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

let pwd = '';
const directories = {};

const assignSizeToDirectories = (file, size) => {
  let path = '/';

  do {
    if (directories[path]) {
      directories[path] += size;
    } else {
      directories[path] = size;
    }

    const str = path === '/' ? file : path;
    path = str.slice(0, file.lastIndexOf('/'));
  } while (path);
};

contents.split('\n').forEach(line => {
  if (line.startsWith('$ cd /')) {
    pwd = '/';
  } else if (line.startsWith('$ cd ..')) {
    pwd = pwd.replace(/(\w+\/$|\w+$)/i, '');
  } else if (line.startsWith('$ cd')) {
    pwd = pwd + line.split(' ').pop() + '/';
  } else if (line.match(/^\d/)) {
    const [fileSize, filename] = line.split(' ');
    assignSizeToDirectories(pwd + filename, parseInt(fileSize));
  }
});

const totalDiskSpace = 70000000;
const neededSpace = 30000000;
const rootDirSize = directories['/'];

const toDelete = neededSpace - (totalDiskSpace - rootDirSize);

const smallestBigEnoughDirectorySize = Object.values(directories).sort((a, b) => a - b).find((value) => value >= toDelete);

console.log(smallestBigEnoughDirectorySize);
