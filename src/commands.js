const { assert } = require('chai');

function getVideoPausedState(browser, videoSelector) {
    return browser.selectorExecute(
        videoSelector,
        // executes the following in the context of the DOM where `videos`
        // is an array of elements corresponding to the given selector.
        // basically just retrieve the `paused` state of the first video.
        videos => videos[0].paused
    );
}
// This file contains loads all custom commands used by tests
// For more info visit http://webdriver.io/guide/usage/customcommands.html
module.exports = browser => {
    // assert that the video with the given selector is playing
    browser.addCommand('assertVideoPlaying', videoSelector => {
        const isVideoPaused = getVideoPausedState(browser, videoSelector);
        assert.ok(!isVideoPaused, `Video '${videoSelector}' is playing`);

        return browser;
    });
    // assert that the video with the given selector is paused
    browser.addCommand('assertVideoPaused', videoSelector => {
        const isVideoPaused = getVideoPausedState(browser, videoSelector);
        assert.ok(isVideoPaused, `Video '${videoSelector}' is paused`);

        return browser;
    });
};
