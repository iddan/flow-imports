const { walk } = require( 'estree-walker' );

const getImports = (ast) => {
  let imports = new Set();
  walk(ast, {
    enter(node, parent) {
      if (node.type === 'ImportDeclaration') {
        imports.add(node.source.value);
      }
      if (node.type === 'CallExpression' && node.callee.type === 'Import') {
        imports.add(node.arguments[0].value);
      }
    },
  });
  return imports;
};

module.exports = getImports;
