const path = require('path');
const fs = require('fs');
const folderModule = require('./index');


function getOutFile(moduleName) {
  return `./tests/${moduleName}.js`;
}

function checkContentFromPath(moduleName) {
  folderModule(path.resolve(__dirname, `./tests/${moduleName}`));
  const content = fs.readFileSync(getOutFile(moduleName)).toString();
  expect(content).toBe(fs.readFileSync(`./tests/snapshots/${moduleName}.js`).toString());
}

test('create file with list of files', () => {
  checkContentFromPath('simple-folder');

  const simpleFolder = require(getOutFile('simple-folder'));
  expect(simpleFolder.a()).toBe('a');
  expect(simpleFolder.bcd()).toBe('d');
});

test('create file with list of files with dash', () => {
  checkContentFromPath('dash');
});

test('create file with list of files with startingNumber', () => {
  checkContentFromPath('number');
});
