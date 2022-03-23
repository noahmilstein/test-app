/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const {defaults} = require('jest-config');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    "<rootDir>/src/setuptests.ts"
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}
