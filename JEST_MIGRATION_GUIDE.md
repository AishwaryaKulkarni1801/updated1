# Jest Migration Guide for Angular 16 Project

## Overview
This document provides a comprehensive guide for the Jest testing framework setup in this Angular 16 project, replacing the default Jasmine/Karma configuration.

## ✅ Migration Completed

### What Was Changed

#### 1. Dependencies
**Removed (Jasmine/Karma):**
- `karma` (~6.4.0)
- `karma-chrome-launcher` (~3.2.0)
- `karma-coverage` (~2.2.0)
- `karma-jasmine` (~5.1.0)
- `karma-jasmine-html-reporter` (~2.1.0)
- `jasmine-core` (~4.6.0)
- `@types/jasmine` (~4.3.0)

**Added (Jest):**
- `jest` (^29.7.0)
- `@types/jest` (^29.5.14)
- `jest-preset-angular` (^13.1.6) - Compatible with Angular 16
- `ts-node` (^10.9.2)

#### 2. Configuration Files

**Created:**
- `jest.config.js` - Main Jest configuration
- `setup-jest.ts` - Jest setup and initialization

**Modified:**
- `tsconfig.spec.json` - Updated types from `jasmine` to `jest`
- `package.json` - Updated test scripts
- `angular.json` - Removed Karma test configuration

### File Structure
```
project-root/
├── jest.config.js           # Jest configuration
├── setup-jest.ts            # Jest setup file
├── tsconfig.spec.json       # TypeScript config for tests
├── package.json             # Updated scripts
├── angular.json             # Removed Karma config
└── src/
    └── app/
        ├── *.spec.ts        # Test files (Jest compatible)
        └── ...
```

## 📝 Configuration Details

### jest.config.js
The main Jest configuration includes:
- **Preset**: `jest-preset-angular` for Angular-specific setup
- **Test Environment**: `jsdom` (simulates browser environment)
- **Transform**: TypeScript and Angular template transformation
- **Module Mapping**: Path aliases and asset mocking
- **Coverage**: Configured with thresholds (70% for all metrics)
- **Coverage Output**: HTML, text, lcov, and JSON formats

### setup-jest.ts
Global test setup includes:
- Jest preset initialization
- JSDOM polyfills for browser APIs
- Mock implementations for HTMLFormElement
- Optional console suppression (commented out)
- Custom matcher examples (commented out)

### tsconfig.spec.json
TypeScript configuration for tests:
- **Types**: `jest` and `node` (replaced `jasmine`)
- **Compiler Options**: ESM interop and decorator metadata
- **Includes**: All `.spec.ts` files and type definitions

## 🚀 Available NPM Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (optimized for CI/CD pipelines)
npm run test:ci
```

## 📊 Test Results

### Initial Test Run
```
Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        ~10-12s
```

### Coverage Results
```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |     100 |      100 |     100 |     100
 app.component.ts   |     100 |      100 |     100 |     100
 demo.component.ts  |     100 |      100 |     100 |     100
```

## 🔧 Writing Tests with Jest

### Basic Test Structure
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
});
```

### Testing Patterns

#### 1. Direct Instantiation (Current Pattern)
```typescript
// Simple component without dependencies
const component = new AppComponent();
expect(component.title).toBe('Angular Demo App');
```

#### 2. Mocking Dependencies
```typescript
// Component with service dependency
const mockService = {
  getData: jest.fn().mockReturnValue(['data'])
};
const component = new MyComponent(mockService as any);
```

#### 3. Spying on Methods
```typescript
const spy = jest.spyOn(Date.prototype, 'toLocaleTimeString')
  .mockReturnValue('12:34:56');
const time = component.getCurrentTime();
expect(time).toBe('12:34:56');
spy.mockRestore();
```

#### 4. Testing with TestBed (Optional)
```typescript
import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ ComponentName ]
  }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(ComponentName);
  component = fixture.componentInstance;
  fixture.detectChanges();
});
```

## 🎯 Jest vs Jasmine Differences

| Feature | Jasmine | Jest |
|---------|---------|------|
| Test function | `it()` | `it()` or `test()` |
| Spy creation | `spyOn(obj, 'method')` | `jest.spyOn(obj, 'method')` |
| Mock return | `.and.returnValue()` | `.mockReturnValue()` |
| Mock implementation | `.and.callFake()` | `.mockImplementation()` |
| Reset mocks | Manual | `jest.restoreAllMocks()` |
| Snapshot testing | ❌ | ✅ |
| Built-in coverage | ❌ | ✅ |

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Module Resolution Errors
**Issue**: Cannot find module '@angular/...'
**Solution**: Ensure `jest-preset-angular` is properly installed and configured in `jest.config.js`

#### 2. TypeScript Compilation Errors
**Issue**: TypeScript errors during test execution
**Solution**: 
- Verify `tsconfig.spec.json` includes correct types
- Check that all test files are included in `tsconfig.spec.json`

#### 3. DOM API Not Available
**Issue**: `window is not defined` or similar
**Solution**: Add polyfills in `setup-jest.ts` or use `testEnvironment: 'jsdom'`

#### 4. Async Testing Issues
**Issue**: Async tests timing out
**Solution**: 
```typescript
// Use async/await
it('should handle async', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});

// Or use done callback
it('should handle async', (done) => {
  asyncFunction().then(result => {
    expect(result).toBe('expected');
    done();
  });
});
```

#### 5. Coverage Threshold Not Met
**Issue**: Tests fail due to coverage thresholds
**Solution**: Adjust thresholds in `jest.config.js` under `coverageThreshold`

## 🔍 IDE Integration

### VS Code Setup

#### 1. Install Jest Extension
Install the "Jest" extension by Orta:
```
ext install Orta.vscode-jest
```

#### 2. VS Code Settings (Optional)
Add to `.vscode/settings.json`:
```json
{
  "jest.autoRun": "off",
  "jest.showCoverageOnLoad": true,
  "jest.debugMode": true
}
```

#### 3. Debugging Tests
Add to `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "Jest: Current File",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--config",
        "jest.config.js"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest"
      }
    }
  ]
}
```

## 📈 Performance Optimization

### Tips for Faster Tests

1. **Use `--maxWorkers`**: Limit parallel workers for faster execution
   ```bash
   npm test -- --maxWorkers=2
   ```

2. **Run Only Changed Tests**: Use watch mode efficiently
   ```bash
   npm run test:watch
   ```

3. **Skip Coverage When Not Needed**: Coverage slows down test execution
   ```bash
   npm test  # Without coverage
   ```

4. **Use `test.only()` During Development**: Focus on specific tests
   ```typescript
   test.only('should test specific case', () => {
     // Only this test runs
   });
   ```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### GitLab CI Example
```yaml
test:
  stage: test
  script:
    - npm ci
    - npm run test:ci
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    when: always
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [jest-preset-angular Documentation](https://thymikee.github.io/jest-preset-angular/)
- [Testing Angular Applications](https://angular.io/guide/testing)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)

## ✨ Best Practices

1. **Keep Tests Simple**: Direct instantiation when possible
2. **Mock External Dependencies**: Use Jest mocks for services, HTTP calls
3. **Test Behavior, Not Implementation**: Focus on what, not how
4. **Use Descriptive Test Names**: `should [action] when [condition]`
5. **Maintain High Coverage**: Aim for >80% code coverage
6. **Run Tests Before Commits**: Use git hooks for automated testing
7. **Keep Tests Fast**: Avoid unnecessary async operations
8. **Isolate Tests**: Each test should be independent

## 🎉 Migration Complete!

Your Angular 16 project is now successfully configured with Jest! All existing tests pass with 100% coverage.

**Next Steps:**
- Write new tests using Jest syntax
- Explore snapshot testing for components
- Set up CI/CD pipeline with `npm run test:ci`
- Configure pre-commit hooks for automated testing

---

**Migration Date**: November 25, 2025  
**Angular Version**: 16.2.0  
**Jest Version**: 29.7.0  
**jest-preset-angular Version**: 13.1.6
