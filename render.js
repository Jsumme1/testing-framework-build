const path = require('path')
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    // dangerously only b/c running code that I have created - otherwise very bad idea. See documentation.
    runScripts: "dangerously",
    resources: "usable",
  });

  // added to code to make jsdom load all scripts and wait before executing tests in dom
  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};

module.exports = render;


