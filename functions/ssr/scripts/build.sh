#!/bin/bash

# workaround for cloudcommerce pnpm monorepo
filename="../../../packages/storefront/scripts/build-prod.sh"
if [[ -f $filename ]]; then
  sh $filename
elif [[ -f "../$filename" ]]; then
  sh "../$filename"
else
  echo '> npx storefront build'
  npx storefront build
fi

exit 0
