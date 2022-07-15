#!/usr/bin/env node

const Runner = require('./runner');
const runner = new Runner;

// due to node version - await statement must be wrapped in function - adding helper function

const run = async () => {
    await runner.collectFiles(process.cwd());
    console.log(runner.testFiles);
};

run();