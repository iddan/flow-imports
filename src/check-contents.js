const flow = require('flow-bin');
const execAsync = require('./exec-async');

const checkContents = async (contents) => {
  const { stdout } = await execAsync(flow, ['check-contents', '--json'], {}, contents);
  return JSON.parse(stdout);
};

module.exports = checkContents;
