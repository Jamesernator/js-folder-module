const path = require('path');
const fs = require('fs');
const folderModule = require('./index');


function checkContentFromPath(filepath) {
  folderModule(path.resolve(__dirname, `./tests/${filepath}`));
  const content = fs.readFileSync(`./tests/${filepath}.js`).toString();
  expect(content).toBe(fs.readFileSync(`./tests/snapshots/${filepath}.js`).toString());
}

test('create file with list of files', () => {
  checkContentFromPath('simple-folder');
});

test('create file with list of files with dash', () => {
  checkContentFromPath('dash');
});

test('create file with list of files with startingNumber', () => {
  checkContentFromPath('number');
});
