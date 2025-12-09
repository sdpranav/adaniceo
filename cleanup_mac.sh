#!/bin/bash
# Remove MacOS metadata files
find . -type f -name "._*" -delete
echo "Cleaned up MacOS metadata files."
