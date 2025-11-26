# Jest Quick Reference - Angular 16 Project

## 🚀 Quick Start Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## 📝 Test File Template

```typescript
import { ComponentName } from './component-name.component';

describe('ComponentName', () => {
  let component: ComponentName;

  beforeEach(() => {
    component = new ComponentName();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have initial value', () => {
    expect(component.property).toBe('expectedValue');
  });
});
```

## 🔍 Common Jest Matchers

```typescript
// Equality
expect(value).toBe(expected);              // Strict equality (===)
expect(value).toEqual(expected);           // Deep equality
expect(value).not.toBe(expected);          // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4.5);
expect(value).toBeCloseTo(0.3, 5);         // Floating point

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays/Iterables
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toHaveProperty('key', value);
expect(object).toMatchObject({ key: value });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(Error);
expect(() => fn()).toThrow('error message');

// Functions
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenLastCalledWith(arg1, arg2);
```

## 🎭 Mocking & Spying

```typescript
// Mock a function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockReturnValueOnce(10);
mockFn.mockResolvedValue('async result');
mockFn.mockRejectedValue(new Error('error'));

// Spy on object method
const spy = jest.spyOn(object, 'method');
spy.mockImplementation(() => 'mocked');
spy.mockReturnValue('value');
spy.mockRestore();

// Mock entire module
jest.mock('./module', () => ({
  function: jest.fn().mockReturnValue('mocked')
}));

// Mock with custom implementation
mockFn.mockImplementation((x) => x * 2);

// Clear/Reset mocks
mockFn.mockClear();        // Clear call history
mockFn.mockReset();        // Reset implementation
jest.restoreAllMocks();    // Restore all spies
```

## ⏱️ Async Testing

```typescript
// Using async/await
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});

// Using promises
it('should handle promises', () => {
  return asyncFunction().then(result => {
    expect(result).toBe('expected');
  });
});

// Using done callback
it('should handle callbacks', (done) => {
  asyncFunction((result) => {
    expect(result).toBe('expected');
    done();
  });
});

// Testing rejections
it('should handle errors', async () => {
  await expect(asyncFunction()).rejects.toThrow('error');
});
```

## 🔧 Setup & Teardown

```typescript
// Run once before all tests
beforeAll(() => {
  // Setup
});

// Run before each test
beforeEach(() => {
  // Setup
});

// Run after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Run once after all tests
afterAll(() => {
  // Cleanup
});
```

## 🎯 Test Organization

```typescript
describe('ComponentName', () => {
  describe('method1', () => {
    it('should do something', () => {
      // Test
    });

    it('should handle edge case', () => {
      // Test
    });
  });

  describe('method2', () => {
    it('should do something else', () => {
      // Test
    });
  });
});
```

## 🏃 Focused & Skipped Tests

```typescript
// Run only this test
it.only('should run this test only', () => {
  // Test
});

// Skip this test
it.skip('should skip this test', () => {
  // Test
});

// Skip entire describe block
describe.skip('ComponentName', () => {
  // Tests
});

// Run only this describe block
describe.only('ComponentName', () => {
  // Tests
});
```

## 📸 Snapshot Testing

```typescript
it('should match snapshot', () => {
  const component = new ComponentName();
  expect(component).toMatchSnapshot();
});

// Update snapshots
// npm test -- -u
```

## 🐛 Debugging Tests

```typescript
// Add debugger statement
it('should debug', () => {
  debugger;
  const result = someFunction();
  expect(result).toBe('expected');
});

// Run single test file
// npm test -- component.spec.ts

// Run tests matching pattern
// npm test -- --testNamePattern="should create"
```

## 🎨 VS Code Debugging

1. Set breakpoint in test file
2. Open Debug panel (Ctrl+Shift+D)
3. Select "Jest: Current File"
4. Press F5 to start debugging

## 📊 Coverage Commands

```bash
# View coverage in terminal
npm run test:coverage

# Coverage files location
./coverage/index.html          # HTML report
./coverage/lcov.info           # LCOV format
./coverage/coverage-final.json # JSON format
```

## 🔥 Pro Tips

1. **Run specific test**: Use `.only()` during development
2. **Fast feedback**: Use `--watch` mode while coding
3. **Mock heavy dependencies**: Speed up tests by mocking
4. **Keep tests isolated**: Each test should be independent
5. **Use descriptive names**: Test names should be clear and specific
6. **Test behavior**: Focus on what the code does, not how
7. **Avoid testing private methods**: Test public API only
8. **Use beforeEach wisely**: Reset state between tests

## 🚨 Common Pitfalls

```typescript
// ❌ Bad: Testing implementation details
it('should call private method', () => {
  const spy = jest.spyOn(component as any, '_privateMethod');
  component.publicMethod();
  expect(spy).toHaveBeenCalled();
});

// ✅ Good: Testing behavior
it('should return correct result', () => {
  const result = component.publicMethod();
  expect(result).toBe('expected');
});

// ❌ Bad: Tests depending on each other
it('should increment counter', () => {
  component.increment();
  expect(component.counter).toBe(1);
});
it('should have counter at 1', () => {
  expect(component.counter).toBe(1); // Fails!
});

// ✅ Good: Independent tests
it('should increment counter', () => {
  component.counter = 0;
  component.increment();
  expect(component.counter).toBe(1);
});
```

## 📚 Quick Links

- [Jest Docs](https://jestjs.io/)
- [jest-preset-angular](https://thymikee.github.io/jest-preset-angular/)
- [Testing Library](https://testing-library.com/)
- [Full Migration Guide](./JEST_MIGRATION_GUIDE.md)

---

**Created**: November 25, 2025  
**Project**: Angular 16 with Jest
