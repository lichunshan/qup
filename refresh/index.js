var qiniu = require('qiniu');
var pkg = require('../package.json');
var configFileName = pkg.name + ".config.js";
var path = require('path');
module.exports = function(){
  // var rootConf = require(path.join(process.cwd(),configFileName));
  // var dirsToRefresh = rootConf.dirsToRefresh;
  // qiniu.cdn.refreshDirs(dirsToRefresh, function(err, respBody, respInfo) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(respInfo.statusCode);
  //   if (respInfo.statusCode == 200) {
  //     var jsonBody = JSON.parse(respBody);
  //     console.log(jsonBody.code);
  //     console.log(jsonBody.error);
  //     console.log(jsonBody.requestId);
  //     console.log(jsonBody.invalidUrls);
  //     console.log(jsonBody.invalidDirs);
  //     console.log(jsonBody.urlQuotaDay);
  //     console.log(jsonBody.urlSurplusDay);
  //     console.log(jsonBody.dirQuotaDay);
  //     console.log(jsonBody.dirSurplusDay);
  //   }
  // });
  console.log('refresh');
}