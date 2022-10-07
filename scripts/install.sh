#!/bin/bash

echo '> Install functions dependencies:'
cd functions
for d in */ ; do
  cd $d
  npm ci
  cd ..
done
