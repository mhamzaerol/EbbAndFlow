module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          // extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            // tests: ['./tests/'],
            // '@components': './src/components',
            // '@actions': './src/actions',
            // '@reducers': './src/reducers',
          },
        },
      ],
    ],
  };
};
