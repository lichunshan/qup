#! /usr/bin/env node
var shell = require('shelljs');
var yargs = require('yargs');
var argv = yargs.alias({
  "v": "version",
  "u": "upload",
  "d": "delete",
  "r": "refresh"
}).argv;
var fs = require('fs');
var path = require('path');
var qiniuUploader = require('qiniu-qupload');
var rootDir = process.cwd();
var upload = require('./upload');
var deleteFile = require('./delete');
var refresh = require('./refresh');
var pkg = require('./package.json');
var configFileName = pkg.name + ".config.js";

//检查配置文件是否存在
function checkFileExist(fileName){
  var files = fs.readdirSync(rootDir);
  return files.includes(fileName);
}
var haveConfigFile = checkFileExist(configFileName);
//创建配置文件
function createConfigFile(fileName, data){
  fs.writeFile(path.join(rootDir, fileName), data, {
    flag: 'a+'
  },function(err){
    if(err){
      console.log(err);
    }
  });
}
// 初始化配置文件
if(argv.init){
  if(!haveConfigFile){
    var defaultConfig = `
    module.exports = {
      "ak"            : "you-ak",
      "sk"            : "you-sk",
      "src_dir"       : ['rootPath'],
      "key_prefix"    : "",
      "zone": "z0",
      "dirsToRefresh": [],
      "options": {
        scope: "bucket"
      }
    }
    `;
    createConfigFile(configFileName, defaultConfig);
  } else {
    console.log('the file is already exist');
  }
}
// 执行上传逻辑
if(haveConfigFile && argv.upload){
  console.log('up');
  upload();
}
if(haveConfigFile && argv.delete){
  deleteFile();
}
if(haveConfigFile && argv.refresh){
  refresh();
  console.log('刷新');
}
