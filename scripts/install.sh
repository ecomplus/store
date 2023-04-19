#!/bin/bash

if [ ! -d "./node_modules" ]; then
  echo '>> Install root dev dependencies:'
  npm ci
fi
echo '>> Install each function dependencies:'
cd functions
for d in */ ; do
  cd $d
  npm ci
  cd ..
done
cd ..
