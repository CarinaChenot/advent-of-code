const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString('utf-8').trim();

const files = [];

let pwd = '';

contents.split('\n').forEach(line => {
  if (line.startsWith('$ cd /')) {
    pwd = '/';
  } else if (line.startsWith('$ cd ..')) {
    pwd = pwd.replace(/(\w+\/$|\w+$)/i, '');
  } else if (line.startsWith('$ cd')) {
    pwd = pwd + line.split(' ').pop() + '/';
  } else if (line.match(/^\d/)) {
    const [fileSize, filename] = line.split(' ');
    files.push([pwd + filename, parseInt(fileSize)]);
  }
});

const directories = {};

files.forEach(([file, size]) => {
  let path = file.slice(0, file.lastIndexOf('/'));

  while (path) {
    if (directories[path]) {
      directories[path] += size;
    } else {
      directories[path] = size;
    }

    path = path.slice(0, path.lastIndexOf('/'));
  }
});

const bigDirectories = Object.fromEntries(Object.entries(directories).filter(([key, value]) => value <= 100000));
const bigDirectoriesSize = Object.values(bigDirectories).reduce((sum, currentValue) => sum + currentValue, 0);

console.log(bigDirectoriesSize);
