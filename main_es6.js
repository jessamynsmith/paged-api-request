var request = require('request');

var url = 'https://underquoted.herokuapp.com/api/v2/quotations/?limit=20&offset=1600';


callPagedApi = (url, previousData) => {
  var deferred = Promise.defer();

  request(url, (error, response, body) => {
    if (error) {
      deferred.reject(error);
    }
    var data = JSON.parse(body);
    var allData = previousData.concat(data.results);
    if (data.next) {
      callPagedApi(data.next, allData).then((data) => {
        deferred.resolve(data);
      });
    } else {
      deferred.resolve(allData);
    }
  });

  return deferred.promise;
};

callPagedApi(url, []).then((data) => {
  console.log(data.length);
});
