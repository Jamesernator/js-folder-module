#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const camelCase = require('camelcase');

function numberToString(number) {
  switch(number) {
    case '1':
      return 'one';
    case '2':
      return 'two';
    case '3':
      return 'three';
    case '4':
      return 'four';
    case '5':
      return 'five';
    case '6':
      return 'six';
    case '7':
      return 'seven';
    case '8':
      return 'eight';
    case '9':
      return 'nine';
    case '0':
      return 'zero';
    default:
      console.warn(`${number} is not a number`);
  }

  return '';
}

function slugify(name) {
  const camelName = camelCase(name);

  const matches = camelName.match(/^\d/);
  if (matches) {
    return `${numberToString(matches[0])}${camelName.substr(1)}`;
  }

  return camelName;
}

function folderModule(srcDir, outfileArg) {
  if (!srcDir) {
    throw new Error(`No source directory given`);
  }

  const outfileNoExt = outfileArg ||
    path.resolve(path.format(path.parse(srcDir)), '..', path.parse(srcDir).name);

  const outfile = outfileNoExt.substr(-3) === '.js' ? outfileNoExt : `${outfileNoExt}.js`;

  mkdirp.sync(path.dirname(outfile, 0o755));
  fs.writeFileSync(outfile, '');

  // and build the export statements
  const files = fs.readdirSync(srcDir);
  const importList = [];
  const exportList = [];

  for (const file of files) {
    const p = path.parse(file);
    // Get the path relative to the outfile so that exports are correct
    const localSrcDir = path.relative(path.dirname(outfile), srcDir);
    const slug = slugify(p.name);
    const _import = `import { default as _${slug} } from "./${path.posix.join(
      localSrcDir,
      file
    )}";\n`;
    const _export = `_${slug} as ${slug},\n`;
    importList.push(_import);
    exportList.push(_export);
  }

  importList.forEach(_import => {
    fs.appendFileSync(outfile, _import);
  });

  fs.appendFileSync(outfile, 'export {\n');
  exportList.forEach(_export => {
    fs.appendFileSync(outfile, `  ${_export}`);
  });
  fs.appendFileSync(outfile, '};\n');
}

if (process.env.NODE_ENV === 'test') {
  module.exports = folderModule;
} else {
  const SRC_DIR = process.argv[2];
  const OUTFILE = process.argv[3];

  folderModule(SRC_DIR, OUTFILE);
}
