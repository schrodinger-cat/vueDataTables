/**
 * Поскольку использование оберток для запросов типа axios, вроде как запрещено - сделаем свою
 * @param {*} url
 */
export function httpGet(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error('Error'));
    };

    xhr.send();
  });
}
