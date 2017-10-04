#!/bin/bash
set -ex

cd "$(dirname "$0")"/../assets/sprites

rm -f *

# create the sprite files
node ../../scripts/create-sprites.js

# optimize with pngquant
pngquant --force --speed 1 --nofs --verbose *

# view results
ls -la

zopflipng -y -m --iterations=500 --lossy_8bit --filters=01234mepb --lossy_transparent emojione-3.0-32x32-or8.png emojione-3.0-32x32.png
zopflipng -y -m --iterations=500 --lossy_8bit --filters=01234mepb --lossy_transparent emojione-3.0-64x64-or8.png emojione-3.0-64x64.png

# view results
ls -la

rm -f *.-or8.png


