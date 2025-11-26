#!/usr/bin/env node

/**
 * Jest Setup Verification Script
 * 
 * Run this script to verify your Jest setup is working correctly
 * Usage: node verify-jest-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Jest Setup...\n');

let allChecksPassed = true;

// Check 1: Configuration files exist
console.log('📁 Checking configuration files...');
const configFiles = [
  'jest.config.js',
  'setup-jest.ts',
  'tsconfig.spec.json',
  'package.json'
];

configFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} is missing`);
    allChecksPassed = false;
  }
});

// Check 2: Package.json dependencies
console.log('\n📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['jest', '@types/jest', 'jest-preset-angular', 'ts-node'];
const deprecatedDeps = ['karma', 'jasmine-core', '@types/jasmine'];

requiredDeps.forEach(dep => {
  if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep} is installed (${packageJson.devDependencies[dep]})`);
  } else {
    console.log(`  ❌ ${dep} is missing`);
    allChecksPassed = false;
  }
});

console.log('\n🗑️  Checking old dependencies removed...');
deprecatedDeps.forEach(dep => {
  if (!packageJson.devDependencies || !packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep} removed`);
  } else {
    console.log(`  ⚠️  ${dep} still present (should be removed)`);
  }
});

// Check 3: Scripts
console.log('\n🎯 Checking npm scripts...');
const requiredScripts = ['test', 'test:watch', 'test:coverage', 'test:ci'];

requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`  ❌ ${script} is missing`);
    allChecksPassed = false;
  }
});

// Check 4: Test files exist
console.log('\n🧪 Checking test files...');
const testFiles = [
  'src/app/app.component.spec.ts',
  'src/app/demo/demo.component.spec.ts'
];

testFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ⚠️  ${file} not found`);
  }
});

// Check 5: Documentation
console.log('\n📚 Checking documentation...');
const docFiles = [
  'JEST_MIGRATION_GUIDE.md',
  'JEST_QUICK_REFERENCE.md',
  'MIGRATION_SUMMARY.md'
];

docFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ⚠️  ${file} not found`);
  }
});

// Check 6: Angular.json
console.log('\n⚙️  Checking angular.json...');
const angularJson = JSON.parse(fs.readFileSync('angular.json', 'utf8'));
const projectName = Object.keys(angularJson.projects)[0];
const hasKarmaTest = angularJson.projects[projectName].architect.test;

if (!hasKarmaTest) {
  console.log('  ✅ Karma test configuration removed');
} else if (hasKarmaTest.builder !== '@angular-devkit/build-angular:karma') {
  console.log('  ✅ Karma configuration not present');
} else {
  console.log('  ⚠️  Karma test configuration still present');
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allChecksPassed) {
  console.log('✅ All checks passed! Jest setup is complete.');
  console.log('\n🚀 Next steps:');
  console.log('   1. Run: npm test');
  console.log('   2. Run: npm run test:coverage');
  console.log('   3. Review: JEST_MIGRATION_GUIDE.md');
  console.log('   4. Try: npm run test:watch');
} else {
  console.log('❌ Some checks failed. Please review the output above.');
  console.log('\n📖 Refer to JEST_MIGRATION_GUIDE.md for troubleshooting.');
}
console.log('='.repeat(50) + '\n');

process.exit(allChecksPassed ? 0 : 1);
