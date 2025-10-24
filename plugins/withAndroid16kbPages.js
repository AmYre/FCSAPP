const { withAndroidManifest } = require('@expo/config-plugins');

const withAndroid16kbPages = (config) => {
  return withAndroidManifest(config, async (config) => {
    const mainApplication = config.modResults.manifest.application[0];

    // Ajouter la propriété pour le support des pages de 16 Ko
    if (!mainApplication.property) {
      mainApplication.property = [];
    }

    // Vérifier si la propriété existe déjà
    const existingProperty = mainApplication.property.find(
      (prop) => prop.$?.['android:name'] === 'android.app.16kb_pages.enabled'
    );

    if (!existingProperty) {
      mainApplication.property.push({
        $: {
          'android:name': 'android.app.16kb_pages.enabled',
          'android:value': 'true',
        },
      });
    }

    // Ajouter enableOnBackInvokedCallback si pas déjà présent
    if (mainApplication.$) {
      mainApplication.$['android:enableOnBackInvokedCallback'] = 'true';
    }

    return config;
  });
};

module.exports = withAndroid16kbPages;
