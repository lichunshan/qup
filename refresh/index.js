var qiniu = require('qiniu');
var path = require('path');
var pkg = require('../package.json');
var configFileName = pkg.name + ".config.js";
var fileMap = require('../refreshmap/file_map.js');
function refreshFile(cdnManager, uriPaths){
  cdnManager.refreshUrls(uriPaths, function(err, respBody, respInfo) {
    if (err) {
      throw err;
    }
    console.log(respInfo.statusCode);
    if (respInfo.statusCode == 200) {
      var jsonBody = JSON.parse(respBody);
      console.log(jsonBody.code);
      console.log(jsonBody.error);
      console.log(jsonBody.requestId);
      console.log(jsonBody.invalidUrls);
      console.log(jsonBody.invalidDirs);
      console.log(jsonBody.urlQuotaDay);
      console.log(jsonBody.urlSurplusDay);
      console.log(jsonBody.dirQuotaDay);
      console.log(jsonBody.dirSurplusDay);
    }
  });
}

module.exports = function(){
  var rootConf = require(path.join(process.cwd(),configFileName));
  var accessKey = rootConf.ak;
  var secretKey = rootConf.sk;
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var cdnManager = new qiniu.cdn.CdnManager(mac);
  var uriPaths = fileMap.map(function(item){
    return 'http://mt.chasing-innovation.com/' + item;
  })
  refreshFile(cdnManager, uriPaths);
}

