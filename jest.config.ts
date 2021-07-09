import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/generators'],
};

export default config;
