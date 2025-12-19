var mysqlConnection = require(__base + "/mysqlClient.js");
var bluebird = require("bluebird");
var db = bluebird.promisifyAll(mysqlConnection.getMySqlConnectionPool());



function doQueryParams(query, bindParams = []) {
  return new bluebird(function (resolve, reject) {
    db.queryAsync(
      {
        sql: query,
        values: bindParams,
      },
      function (err, data) {
        return err ? reject(err) : resolve(data);
      }
    );
  });
}

module.exports = {
  doQueryParams: doQueryParams,
};