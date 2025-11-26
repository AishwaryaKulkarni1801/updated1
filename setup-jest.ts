/**
 * Jest Setup File for Angular
 * 
 * This file is executed before each test file is run.
 * It initializes the Angular testing environment for Jest.
 */

import 'jest-preset-angular/setup-jest';

/**
 * Global Jest Configuration
 * 
 * Configure global test settings and behaviors
 */

// Mock global objects if needed
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

/**
 * Mock HTMLFormElement methods that are not implemented in JSDOM
 */
HTMLFormElement.prototype.submit = jest.fn();

/**
 * Suppress specific console warnings/errors during tests if needed
 * Uncomment and customize as needed:
 */
// const originalWarn = console.warn;
// const originalError = console.error;

// beforeAll(() => {
//   console.warn = jest.fn((...args) => {
//     const firstArg = args[0];
//     // Suppress specific warnings
//     if (typeof firstArg === 'string' && firstArg.includes('Some warning to suppress')) {
//       return;
//     }
//     originalWarn.apply(console, args);
//   });
  
//   console.error = jest.fn((...args) => {
//     const firstArg = args[0];
//     // Suppress specific errors
//     if (typeof firstArg === 'string' && firstArg.includes('Some error to suppress')) {
//       return;
//     }
//     originalError.apply(console, args);
//   });
// });

// afterAll(() => {
//   console.warn = originalWarn;
//   console.error = originalError;
// });

/**
 * Custom matchers can be added here
 * Example:
 * expect.extend({
 *   toBeWithinRange(received, floor, ceiling) {
 *     const pass = received >= floor && received <= ceiling;
 *     if (pass) {
 *       return {
 *         message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
 *         pass: true,
 *       };
 *     } else {
 *       return {
 *         message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
 *         pass: false,
 *       };
 *     }
 *   },
 * });
 */
