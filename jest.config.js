const { defaults } = require("jest-config");

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  verbose: true,
};
