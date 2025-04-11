#!/usr/bin/env node

/* eslint-disable no-console, no-restricted-syntax */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

const scriptPaths = ['../../../packages/storefront/scripts/build-prod.sh'];
scriptPaths.push(`../${scriptPaths[0]}`);
let isScriptFound = false;
for (const scriptPath of scriptPaths) {
  const normalizedPath = path.normalize(scriptPath);
  if (fs.existsSync(normalizedPath)) {
    if (process.platform === 'win32') {
      runCommand(`sh ${normalizedPath}`);
    } else {
      runCommand(`sh ${normalizedPath}`);
    }
    isScriptFound = true;
    break;
  }
}
if (!isScriptFound) {
  console.log('>> npx storefront build');
  if (!runCommand('npx storefront build')) {
    console.log('>> astro build');
    runCommand('astro build');
  }
}
process.exit(0);
