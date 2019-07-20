var qiniu = require('qiniu');
var fs = require('fs');
var rootDir = process.cwd();
var path = require('path');
var rootConf = require(path.join(process.cwd(),'hello.config.js'));
// 要上传的文件夹根目录
var filePaths = rootConf.src_dir.map(function(item){
  return path.join(rootDir,item);
})
var keyPreFix = rootConf.key_prefix;
function uploadFile(localFile, token, config, rootPath){
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  var key=localFile.replace(rootPath,keyPreFix).replace(/\\/g, '/');
  formUploader.putFile(token, key, localFile, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
}

function uploadDirectory(dirPath, uploadToken, config, rootDir){
  // 读取设定的目录
  var files = fs.readdirSync(dirPath);
  files.forEach(function(item, index){
    var uriPath = `${dirPath}\\${item}`;
    fs.stat(uriPath, function(err, stats){
      if (err) throw err;
      if(stats.isDirectory()){
        uploadDirectory(uriPath, uploadToken, config, rootDir);
      } else {
        uploadFile(uriPath, uploadToken, config, rootDir);
      }
    });
  })
}
module.exports = function(){
  var accessKey = rootConf.ak;
  var secretKey = rootConf.sk;
  var options = rootConf.options;
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey, options);
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  var config = new qiniu.conf.Config();
  config.zone = qiniu.zone["Zone_" + rootConf.zone];


  filePaths.forEach(function(rootPath){
    uploadDirectory(rootPath, uploadToken, config, rootPath);
  })
}