var qiniu = require('qiniu');
var fs = require('fs');
var rootDir = process.cwd();
var path = require('path');
var pkg = require('../package.json');
var configFileName = pkg.name + ".config.js";


module.exports = function(){
  var rootConf = require(path.join(process.cwd(),configFileName));
  //TODO
  console.log('删除文件操作');
}

