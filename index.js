#!/usr/bin/env node
const process = require('process')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const SRC_DIR = process.argv[2]
if (!SRC_DIR) {
    throw new Error(`No source directory given`)
}
const OUTFILE = process.argv[3]
    ? process.argv[3]
    // This removes any trailing / in the path name
    : './' + path.format(path.parse(SRC_DIR)) + '.js'

mkdirp.sync(path.dirname(OUTFILE, 0o755))
fs.writeFileSync(OUTFILE, '')

// and build the export statements
const files = fs.readdirSync(SRC_DIR)
for (const file of files) {
    const p = path.parse(file)
    // Get the path relative to the OUTFILE so that exports are correct
    const srcDir = path.relative(path.dirname(OUTFILE), SRC_DIR)
    const _import = `import { ${ p.name } as _${ p.name } } from "./${ path.posix.join(srcDir, file) }"\n`
    const _export = `export { _${ p.name } as default }\n`
    fs.appendFileSync(OUTFILE, _import)
    fs.appendFileSync(OUTFILE, _export)
}
