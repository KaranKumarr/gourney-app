const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = (() => {
  const c = getDefaultConfig(__dirname);

  const { transformer, resolver } = c;

  c.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  c.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return c;
})();

module.exports = withNativeWind(config, { input: "./styles/global.css" });
