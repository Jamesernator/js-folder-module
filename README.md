
# Folder Modules

### Usage

`folder-module <input-directory-name>`

Or specify a file:

`folder-module <input-directory-name> <out-file>`

### Info

folder-module is a tiny utility for turning a folder of default exports into
a single file of exports of the default of each of the individual files within the folder

For example a folder `foo/` with files `a.js`, `b.js` and `default.js` will generate the file `./foo.js`:

```js
export { default as a } from "./foo/a.js"
export { default as b } from "./foo/b.js"
export { default } from "./foo/default.js"
```

You can also specify a filename and paths will be resolved to that filename e.g.
For the above with an out file name `./bar/baz/foo.js` you'll get:

```js
export { default as a } from "../../foo/a.js"
export { default as b } from "../../foo/b.js"
export { default } from "../../foo/default.js"
```
