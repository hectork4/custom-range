// filepath: /C:/Users/hecto/DevFile/Next/MangoTest/range-project/jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(js|jsx)$': '@swc/jest',
    },
    moduleNameMapper: {
      '\\.(css)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/src/$1', 
    },
  };