describe('Check video page', function() {
    it('should pause/play video when clicking on it', function() {
        browser.url('/video.html');

        const videoSelector = '#video';

        browser.waitForExist(videoSelector, 10000);
        browser.assertVideoPaused(videoSelector);
        browser.click(videoSelector);
        browser.assertVideoPlaying(videoSelector);
        browser.click(videoSelector);
        browser.assertVideoPaused(videoSelector);
    });
});
