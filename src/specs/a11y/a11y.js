// load the axe-core script
const axeSource = require('axe-core').source;
const { assert } = require('chai');

describe('A11y testing with axe example', function() {
    it('should verify that there are no critical a11y violations', function() {
        browser.url('https://www.accessibilityonline.org/ao/');

        // inject the axe script - this will make axe availabile in the page
        browser.execute(axeSource);

        // make sure that the browser has enough time to execute axe
        // it may take a while
        // browser.timeouts('script', 60000);
        // run axe inside the browser and get results
        const { value } = browser.executeAsync(function(done) {
            // eslint-disable-next-line no-undef
            axe.run(function(err, results) {
                if (err) done(err);
                done(results);
            });
        });

        // filtering out non-critical violations
        // it would have been nice to avoid this
        // but I couldn't find a website that didn't have any violations
        const violations = value.violations.filter(
            v => v.impact === 'critical'
        );

        assert.lengthOf(violations, 0, 'Expected no critical a11y violations');
    });
});
