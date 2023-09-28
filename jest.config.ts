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
    '@api/(.+)': '<rootDir>/modules/api/$1',
    '@application/(.+)': '<rootDir>/modules/application/$1',
    '@infra/(.+)': '<rootDir>/modules/infra/$1',
  },
};

export default config;
