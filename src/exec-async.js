const { execFile } = require('child_process');
const { Readable } = require('stream');

const execAsync = (file, args, options, stdin) => new Promise((resolve, reject) => {
  const child = execFile(file, args, options, (err, stdout, stderr) => {
    if (err) {
      reject(err);
    }
    resolve({ stdout, stderr });
  });
  const stdinStream = new Readable();
  stdinStream.push(stdin);
  stdinStream.push(null);
  stdinStream.pipe(child.stdin);
});

module.exports = execAsync;
