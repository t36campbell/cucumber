module.exports = {
  default: {
      parallel: 2,
      format: ['summary ', 'progress-bar ', '@cucumber/pretty-formatter','html:reports/report.html', 'json:reports/report.json '],
      path: ['features/**/*.feature'],
      require: ['features/steps/**/*.ts'], // Transpiles the `.ts` steps
      requireModule: ['ts-node/register'],
      formatOptions: { snippetInterface: 'async-await' }
  }
}