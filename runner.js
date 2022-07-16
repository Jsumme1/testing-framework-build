const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render')
// array to ignore certain directories - see collectFiles for implementation
const forbiddenDirs = ['node_mudules'];

class Runner {
  constructor() {
    // store all files that are found
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`-----${file.shortName}`));
      const beforeEaches = [];
      // global.* makes it available globally throughout app
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = async (desc, fn) => {
        beforeEaches.forEach(func => func());
        try{
        await fn();
        console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tX - ${desc}`));
          console.log(chalk.red('\t', message));
        }
      };

      try{
      require(file.name)
      }catch(err){
          console.log(chalk.red('X - Error Loading File', file.name));
          console.log(chalk.red(err));
      }
    }
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
          this.testFiles.push({name: filepath, shortName: file});

        } else if (stats.isDirectory()&& !forbiddenDirs.includes(file)) {
          const childFiles = await fs.promises.readdir(filepath);
          // take everything from childFiles and add each one individually to the files array to be iterated over || map allows full path name to be added
          files.push(...childFiles.map(f=> path.join(file, f)));
        }
          
      }
    }
}


module.exports = Runner;