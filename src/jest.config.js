/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageReporters: ['html'],
  setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],
  modulePathIgnorePatterns: ['TestConstants.ts']
};
