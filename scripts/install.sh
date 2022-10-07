#!/bin/bash

cd functions
for d in */ ; do
  cd $d
  npm ci
  cd ..
done
