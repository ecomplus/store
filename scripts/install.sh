#!/bin/bash

if [ ! -d "./node_modules" ]; then
  echo '>> Install root dev dependencies:'
  if [ -f "./package-lock.json" ]; then
    npm ci
  elif
    npm i
  fi
fi
echo '>> Install each function dependencies:'
cd functions
for d in */ ; do
  cd $d
  if [ -f "./package-lock.json" ]; then
    npm ci
  elif
    npm i
  fi
  cd ..
done
cd ..
