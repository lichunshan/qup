var qiniu = require('qiniu');
var path = require('path');
var pkg = require('../package.json');
var configFileName = pkg.name + ".config.js";

module.exports = function(){
  var rootConf = require(path.join(process.cwd(),configFileName));
  var accessKey = rootConf.ak;
  var secretKey = rootConf.sk;
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  config.zone = qiniu.zone["Zone_" + rootConf.zone];
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  function deleteFile(bucket, key){
    bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        //throw err;
      } else {
        console.log(`${respInfo.statusCode} ${key} delete successful!`);
      }
    });
  }
  function getKeyLists(bucket, key, deleteFileCallBack){
    var options = {
      limit: 1000,
      prefix: key + '/',
    };
    bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        throw err;
      }
      if (respInfo.statusCode == 200) {
        var items = respBody.items;
        items.forEach(function(item) {
          console.log(item.key);
          deleteFileCallBack(bucket, item.key);
        });
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  }
  getKeyLists(rootConf.options.scope, rootConf.key_prefix, deleteFile);
}

