# Folder Modules

[![Build Status](https://travis-ci.org/jdeniau/folder-module.svg?branch=master)](https://travis-ci.org/jdeniau/folder-module)

### Usage

`folder-module <input-directory-name>`

Or specify a file:

`folder-module <input-directory-name> <out-file>`

### Info

folder-module is a tiny utility for turning a folder of default exports into
a single file of exports of the default of each of the individual files within the folder

For example a folder `foo/` with files `a.js`, `b.js` and `default.js` will generate the file `./foo.js`:

```js
import _a from "./foo/a.js"
export {_a as a}
import _b from "./foo/b.js"
export {_b as b}
import _default from "./foo/default.js"
export {_default as default}
```

You can also specify a filename and paths will be resolved to that filename e.g.
For the above with an out file name `./bar/baz/foo.js` you'll get:

```js
import _a from "../../foo/a.js"
export {_a as a}
import _b from "../../foo/b.js"
export {_b as b}
import _default from "../../foo/default.js"
export {_default as default}
```
