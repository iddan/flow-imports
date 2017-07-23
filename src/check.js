const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { parse } = require('flow-parser');
const checkContents = require('./check-contents');
const getImports = require('./get-imports');
const { isFull } = require('./util');

const readFile = promisify(fs.readFile);

module.exports = async function check(file, {
  onErrors,
  onAst,
  followImports = true,
  checked = new Set(),
}) {
  const normalizedFile = !file.endsWith('.js')
    ? file + '.js'
    : file;
  
  if (checked.has(normalizedFile)) {
    return;
  }

  checked.add(normalizedFile);

  const contents = await readFile(normalizedFile, 'utf-8');

  const ast = parse(contents);
  if (onAst) {
    onAst(normalizedFile, ast);
  }

  const { errors } = await checkContents(contents);
  if (isFull(errors)) {
    onErrors(normalizedFile, errors);
  }

  if (followImports) {
    await Promise.all(
      [...getImports(ast)].map(importedModule => check(path.resolve(path.dirname(normalizedFile), importedModule), {
        onErrors,
        onAst,
        followImports,
        checked,
      }))
    );
  }
};
