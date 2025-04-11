#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const { execSync } = require('child_process');

function runCommand(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}
if (!fs.existsSync('./node_modules')) {
  console.log('>> Install root dev dependencies:');
  if (fs.existsSync('./package-lock.json')) {
    runCommand('npm ci');
  } else {
    runCommand('npm i');
  }
}
console.log('>> Install each function dependencies:');
try {
  process.chdir('./functions');
  const directories = fs.readdirSync('.').filter((file) => {
    return fs.statSync(file).isDirectory();
  });
  directories.forEach((dir) => {
    process.chdir(dir);
    if (!fs.existsSync('./node_modules')) {
      console.log(`>> ${dir}:`);
      if (fs.existsSync('./package-lock.json')) {
        runCommand('npm ci');
      } else {
        runCommand('npm i');
      }
    }
    process.chdir('..');
  });
  process.chdir(process.env.INIT_CWD || '..');
} catch (error) {
  console.error('Error processing directories:', error.message);
}
