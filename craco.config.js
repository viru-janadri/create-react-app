const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const path = require("path");

module.exports = {
  webpack: {
    plugins: {
      add: [new VanillaExtractPlugin()],
      configure: (webpackConfig) => {
        const moduleScopePlugin = webpackConfig.resolve.plugins.find(
          (plugin) => plugin instanceof ModuleScopePlugin
        );
        moduleScopePlugin.allowedPaths.push(
          path.resolve(
            __dirname,
            "node_modules/@vanilla-extract/webpack-plugin"
          )
        );
        webpackConfig.module.rules.push({
          test: /\.(js|ts|tsx)$/,
          loader: "@filament/react-webpack-loader",
        });

        return webpackConfig;
      },
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.moduleNameMapper = {
        "(^@filament/fonts)$": "identity-obj-proxy",
        ...jestConfig.moduleNameMapper,
      };
      jestConfig.transform = {
        "^.+\\.css\\.(ts|js)$": "@vanilla-extract/jest-transform",
        ...jestConfig.transform,
      };
      jestConfig.transformIgnorePatterns = [
        "node_modules/(?!@filament-theme|@filament/theme)",
        ...jestConfig.transformIgnorePatterns,
      ];
      return jestConfig;
    },
  },
};
