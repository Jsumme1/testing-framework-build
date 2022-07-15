const fs = require('fs');
const path = require('path');

class Runner {
  constructor() {
    // store all files that are found
    this.testFiles = [];
  }
  // iterate through all folders, look for .test.js and add file name and path to this.files [] Breadth First search
    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);
       
        // is returned "file" a file or a folder?
       for (let file of files) {
        // get full name of file/folder
        const filepath= path.join(targetPath, file);
        // determine whether file is file or folder using lstat
        const stats = await fs.promises.lstat(filepath);

        if (stats.isFile() && file.includes('.test.js')){
          this.testFiles.push({name: filepath});

        } else if (stats.isDirectory()) {
          const childFiles = await fs.promises.readdir(filepath);
          // take everything from childFiles and add each one individually to the files array to be iterated over || map allows full path name to be added
          files.push(...childFiles.map(f=> path.join(file, f)));
        }
          
      }
    }
}


module.exports = Runner;