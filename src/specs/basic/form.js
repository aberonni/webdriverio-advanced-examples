const { assert } = require('chai');

const IndexPage = require('../../pageobjects/index.page');

describe('Check form on static website', function() {
    it('should create element with form data', function() {
        const name = 'foo';
        const email = 'foo@bar.com';
        const message = 'Hello!';

        IndexPage.open();
        IndexPage.contactName.setValue(name);
        IndexPage.contactEmail.setValue(email);
        IndexPage.contactMessage.setValue(message);
        IndexPage.contactSubmit.click();

        const output = browser.alertText();
        assert.equal(output, `Form data: "${name}" "${email}" "${message}"`);
    });
});
