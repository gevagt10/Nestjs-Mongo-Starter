#!/bin/bash
# The script required permission to run: chmod u+x <PATH>/mac-copy-essentials.command

echo "Copying configuration files..."
cp -Rf "../src/config" "../dist/src/config"
