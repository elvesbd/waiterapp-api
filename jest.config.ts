import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@category/(.+)': '<rootDir>/modules/category/$1',
    '@order/(.+)': '<rootDir>/modules/order/$1',
    '@product/(.+)': '<rootDir>/modules/product/$1',
    '@database/(.+)': '<rootDir>/modules/shared/database/$1',
  },
};

export default config;
