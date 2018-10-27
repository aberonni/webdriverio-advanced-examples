module.exports = class Page {
    constructor() {
        this.title = 'Massively by HTML5 UP';
    }

    open(path) {
        browser.url(path);
    }
};
