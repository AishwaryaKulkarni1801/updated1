module.exports = {
  // Use jest-preset-angular for Angular-specific Jest configuration
  preset: 'jest-preset-angular',

  // Setup file to initialize the Angular testing environment
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  // Test environment - jsdom simulates a browser environment
  testEnvironment: 'jsdom',

  // Root directory for tests
  roots: ['<rootDir>/src'],

  // Test file patterns - matches .spec.ts files
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],

  // Transform TypeScript files using jest-preset-angular
  transform: {
    '^.+\\.(ts|tsx|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Module name mapping for Angular imports and path aliases
  moduleNameMapper: {
    // Handle Angular assets imports
    '\\.(jpg|jpeg|png|gif|svg|css|scss|sass|less)$': 'jest-preset-angular/build/testing/jest-mock.js',
    
    // Support path aliases from tsconfig (if any)
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1'
  },

  // Coverage configuration
  collectCoverage: false, // Enable via CLI with --coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/**'
  ],

  // Coverage thresholds (optional - can be adjusted)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Coverage output directory
  coverageDirectory: '<rootDir>/coverage',

  // Coverage reporters
  coverageReporters: ['html', 'text', 'lcov', 'json'],

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  // Verbose output
  verbose: true
};
