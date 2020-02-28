const { defaults } = require('jest-config');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'server/**/*.ts'],
  verbose: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules/']
};
