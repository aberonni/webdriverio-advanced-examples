const { assert } = require('chai');

const IndexPage = require('../../pageobjects/index.page');

describe('Check title on static website', function() {
    it('should have "Massively by HTML5 UP" as page title', function() {
        IndexPage.open();
        const title = browser.getTitle();
        assert.equal(title, 'Massively by HTML5 UP');
    });
});
