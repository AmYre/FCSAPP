const withAndroid16kbPages = require('./plugins/withAndroid16kbPages');

module.exports = ({ config }) => {
  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      withAndroid16kbPages,
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: "35.0.0",
            enableProguardInReleaseBuilds: false,
            enableShrinkResourcesInReleaseBuilds: false
          }
        }
      ]
    ]
  };
};
