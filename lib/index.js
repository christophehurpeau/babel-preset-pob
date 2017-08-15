/* eslint-disable strict, complexity */

'use strict';

const presetFlow = require('babel-preset-flow');
const pluginImportExportRename = require('babel-plugin-import-export-rename');
const pluginTransformExportDefaultName = require('babel-plugin-transform-export-default-name-forked');
const pluginMinifyReplace = require('babel-plugin-minify-replace');

exports.buildPreset = function(context, opts) {
  // `|| {}` to support node 4
  opts = opts || {};
  const production =
    opts.production !== undefined ? opts.production : process.env.NODE_ENV === 'production';
  if (typeof production !== 'boolean') {
    throw new Error("Preset pob 'production' option must be a boolean.");
  }

  let replacements = opts.replacements !== undefined ? opts.replacements : {};
  if (typeof replacements !== 'object') {
    throw new Error("Preset pob 'replacements' option must be an object.");
  }

  let exportDefaultName =
    opts.exportDefaultName !== undefined ? opts.exportDefaultName : !production;
  if (typeof exportDefaultName !== 'boolean') {
    throw new Error("Preset pob 'exportDefaultName' option must be an boolean.");
  }

  const keys = Object.keys(replacements);
  // use indexOf to support node 4
  if (keys.indexOf('PRODUCTION') !== -1) {
    throw new Error(
      "Preset pob 'replacements.production' is reserved. Use option 'production' if you want to change it."
    );
  }
  keys.forEach(key => {
    if (key.toUpperCase() !== key) console.warn('warning: replacement key should be in uppercase.');
    if (typeof replacements[key] !== 'boolean') {
      throw new Error(`Preset pob 'replacements.${key}' option must be a boolean.`);
    }
  });

  replacements.PRODUCTION = production;
  keys.push('PRODUCTION');

  return {
    presets: [presetFlow].filter(Boolean),
    plugins: [
      [pluginImportExportRename, { '^([a-z\\-]+|[./]+)/src(.*)$': '$1$2' }],
      exportDefaultName && [pluginTransformExportDefaultName, { compose: true }],
      [
        pluginMinifyReplace,
        {
          replacements: keys.map(key => ({
            identifierName: key,
            replacement: { type: 'booleanLiteral', value: replacements[key] },
          })),
        },
      ],
    ].filter(Boolean),
  };
};
