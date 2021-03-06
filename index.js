#!/usr/bin/env node

const semverSatisfies = require('semver/functions/satisfies')
const shell = require('shelljs')
const chalk = require('chalk')
const query = require('./lib/query')
const { name, version, engines } = require('./package.json')
const debug = require('debug')
const cli = require('cac')(name)

cli
  .command('<targetDir>', 'target directory')
  .option('-d, --debug', 'enable debug mode')
  .option('-b, --branch <branch>', 'specify which branch to clone', {
    default: 'master',
  })
  .option('-i, --install', 'install dependencies after scaffolding')
  .option('--remove', 'remove the created folder after scaffolding')
  .action((targetDir, options) => {
    if (options.debug) debug.enable('create-vuepress:*')

    query({
      targetDir: targetDir,
      ...options,
    })
  })

if (!semverSatisfies(process.version, engines.node)) {
  console.error(chalk.red('✘ Generator only works with Node ' + engines.node))
  process.exit(1)
}

if (!shell.which('git')) {
  console.error(chalk.red('✘ Generator needs git to work!'))
  process.exit(1)
}

cli.help()
cli.version(version)
cli.parse()
