const path = require('path');
const {
  getBabelLoader,
} = require('customize-cra');

module.exports = {
  webpack: function(config, env) {

    const babelLoader = getBabelLoader(config);
    babelLoader.options.presets = babelLoader.options.presets || [];
    babelLoader.options.presets.push(
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            ie: 10,
          },
          modules: 'umd',
        },
      ],
    );

    const babelLoaderOthers = getBabelLoader(config, true);
    babelLoaderOthers.options.presets = babelLoaderOthers.options.presets || [];
    babelLoaderOthers.options.presets.push(
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            ie: 10,
          },
        },
      ],
    );
    babelLoaderOthers.options.exclude = babelLoaderOthers.options.exclude || [];
    babelLoaderOthers.options.exclude.push(
      /node_modules[\\\/]core-js/,
      /node_modules[\\\/]webpack[\\\/]buildin/,
    );
    console.log(config);
    return config;
  },
  jest: function(config) {

    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      return config;
    };
  },
  paths: function(paths, env) {

    return paths;
  },
};