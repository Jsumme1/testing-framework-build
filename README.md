# testing-framework-build

# User Story

## Must be Node-based CLI framework
### initial set up 
#### #!/usr/bin/env node in index.js
#### "bin": { "tme": "index.js"} into package.json
## Must be able to test browser based JS applications
## Must require minimal setup
## Must be able to test a whole application - not a small widget
## CLI must have a watch mode so dev doesn't need to repeatedly restart node (like nodemon)
## CLI must automatically find and run all files in the project that have a name of ".test.js"
### must use tme command from directory to be tested

# Implementation Plan
## file collection
### find all files ending in '*.test.js' recursively through folders
### store a reference to each found file
### Once full list of the test files is obtained, execute them one by one
## test environment setup
## test file execution
## report results


## runner.js
   ### collects all files,
### calls function to do environment set up
   ### executing testing
