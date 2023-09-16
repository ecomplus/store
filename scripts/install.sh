#!/bin/bash

if [ ! -d "./node_modules" ]; then
  echo '>> Install root dev dependencies:'
  if [ -f "./package-lock.json" ]; then
    npm ci
  else
    npm i
  fi
fi
echo '>> Install each function dependencies:'
cd functions
for d in */ ; do
  cd $d
  if [ ! -d "./node_modules" ]; then
    if [ -f "./package-lock.json" ]; then
      npm ci
    else
      npm i
    fi
  fi
  cd ..
done
cd ..
