const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // Ceci est requis pour le preprocesseur afin de générer des rapports JSON après chaque exécution, et plus encore
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  // Assurez-vous de retourner l'objet de configuration car il pourrait avoir été modifié par le plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'ffuz63',
  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx,feature}"
    ],        
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    defaultCommandTimeout: 6000,
    env: {
      allureReuseAfterSpec: true,
    },
  },
});
