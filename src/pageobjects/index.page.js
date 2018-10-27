const Page = require('./page');

class LoginPage extends Page {
    get contactName() {
        return browser.element('input#name');
    }

    get contactEmail() {
        return browser.element('input#email');
    }

    get contactMessage() {
        return browser.element('textarea#message');
    }

    get contactSubmit() {
        return browser.element('input[type="submit"]');
    }

    open() {
        super.open('/');
    }
}

module.exports = new LoginPage();
