import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/generators'],
  testTimeout: 50000,
};

export default config;
