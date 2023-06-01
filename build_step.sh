#!/bin/bash

echo "Build script"

# install backend dependencies
npm install

# install backend dependencies
npm run build:ui

# start application
npm start
