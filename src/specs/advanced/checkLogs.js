const { assert } = require('chai');

describe('Make sure there are no errors on the index page', function() {
    it('gets console log and make sure there are no errors', async function() {
        browser.url('/');
        const logs = await browser.log('browser').value;
        const errors = logs.filter(log => log.level === 'SEVERE');
        assert.lengthOf(errors, 0, 'The console does not contain errors');
    });
});
