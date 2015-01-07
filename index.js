function isDir(obj) {
  return typeof obj.middleware === 'undefined';
}

function handle(app, prefix, routes) {
  Object.keys(routes).forEach(function(key) {
    if (isDir(routes[key])) {
      handle(app, prefix + '/' + key, routes[key]);
    } else {
      app.use(module.exports.mount(prefix, routes[key].middleware()));
    }
  });
}

module.exports = function(app, prefix, path) {
  var routes = require('./lib/require-dir')(path);
  handle(app, prefix, routes);
};

module.exports.mount = require('koa-mount');
