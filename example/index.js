require('..').check(require.resolve('./src/index'), {
  onErrors(file, errors) {
    console.log({ file, errors });
  },
  onAst(file, ast) {
    console.log({ file, ast })
  }
})
