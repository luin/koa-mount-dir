var path = require('path');
describe('mount dir', function() {
  it('should work', function() {
    var results = [];
    var app = {
      use: function(res) {
        results.push(res);
      }
    };
    var mount = function(prefix, router) {
      return [prefix, router];
    };
    var mountDir = require('../');
    mountDir.mount = mount;
    mountDir(app, '/prefix', path.join(__dirname, 'fixtures'));
    expect(results).have.length(4);
  });
});
