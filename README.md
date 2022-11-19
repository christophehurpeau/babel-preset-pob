# Migrated to [pob](https://github.com/christophehurpeau/pob)

https://github.com/christophehurpeau/pob/tree/main/packages/babel-preset-pob-env

# babel-preset-pob [![NPM version][npm-image]][npm-url]

base babel preset

[![Dependency Status][daviddm-image]][daviddm-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]

## Options

- production: `true` | `false` (default: process.env.NODE_ENV === 'production')
- exportDefaultName: `true` | `false` (default: !production)
- replacements: { `[key]`: `true` | `false` }. Always add { PRODUCTION: production }. Key should be uppercase.

## Content

This preset includes [babel-preset-flow](https://www.npmjs.com/package/babel-preset-flow) and  [babel-preset-flow-runtime](https://www.npmjs.com/package/babel-preset-flow-runtime) in dev.

Also includes the following plugins:

- [babel-plugin-import-export-rename](https://www.npmjs.com/package/babel-plugin-import-export-rename) rename `src/*` to `*`, usefull if you have an IDE to autocomplete and points to src code,
- [babel-plugin-transform-export-default-name-forked](https://www.npmjs.com/package/babel-plugin-transform-export-default-name-forked) (non-production mode only),
- [babel-plugin-minify-replace](https://www.npmjs.com/package/babel-plugin-minify-replace) option `replacements`,

Note: You can also add [babel-preset-babili-optimizations](https://www.npmjs.com/package/babel-preset-babili-optimizations) and [babel-plugin-discard-module-references](https://www.npmjs.com/package/babel-plugin-discard-module-references) to remove unused imports, if you import only in dev or only in production.

## Install

```bash
npm install --save-dev babel-preset-pob
yarn add --dev babel-preset-pob
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "presets": ["pob"]
}
```

```json
{
  "presets": [["pob", { "production": true, "replacements": { "BROWSER": false } }]]
}
```

### Via CLI

```sh
babel script.js --presets pob
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: [require('babel-preset-pob')]
});
```

```javascript
require("babel-core").transform("code", {
  presets: [[require('babel-preset-pob'), { production: process.env.NODE_ENV === 'production' }]]
});
```

[npm-image]: https://img.shields.io/npm/v/babel-preset-pob.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-preset-pob
[daviddm-image]: https://david-dm.org/christophehurpeau/babel-preset-pob.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/babel-preset-pob
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/babel-preset-pob/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/babel-preset-pob
