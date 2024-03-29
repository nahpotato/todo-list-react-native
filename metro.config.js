/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { resolver } = config;
const { sourceExts } = resolver;

module.exports = {
  ...config,
  resolver: {
    ...resolver,
    sourceExts: [...sourceExts, 'sql'],
  },
};
