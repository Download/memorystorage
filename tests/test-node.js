var QUnit = require('node-qunit-phantomjs');

QUnit('./tests/index.html', {
    'verbose': true,
    'phantomjs-options': ['--web-security=no']
});
