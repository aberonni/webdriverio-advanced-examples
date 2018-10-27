const { assert } = require('chai');

describe('simple vrs test', function() {
    it('tests that the footer has not changed', function() {
        const elementToCheck = '#footer';

        browser.url('/');
        browser.waitForVisible(elementToCheck);

        const results = browser.checkElement(elementToCheck);
        results.forEach(result => assert.ok(result.isExactSameImage));
    });
});
