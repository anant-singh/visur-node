'use strict';

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.sendfile('../../visur-angular/src/client/index.html');
  });
};
