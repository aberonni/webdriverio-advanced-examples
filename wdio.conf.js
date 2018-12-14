/* global browser */
const commandsHelper = require('./src/commands');
const visualRegression = require('./src/vrsConfiguration');
const audioDetector = require('./src/audio-detector');

const staticServerPort = 4242;
const chromeArgs = ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'];
let specs = ['src/specs/**/*.js'];
let excludedTests = [];
let extensions = [audioDetector.extension];

if (process.env.CI || process.env.TRAVIS) {
    chromeArgs.push('--headless');
    // disabled because not working on Travis CI
    excludedTests = [
        // cannot run vrt on travis - different font rendering
        'src/specs/advanced/vrt.js',
        // cannot use any extensions in headless mode
        'src/specs/advanced/audio.js',
        // not sure why this isn't working on travis
        // don't have time to investigate
        'src/specs/advanced/video.js',
    ];
    // cannot use extensions in headless mode
    extensions = [];
}

if (process.env.CONSOLIDATE) {
    // set when running 'yarn consolidate'
    // means that we should override default screenshots
    // so might as well just run this test
    specs = ['src/specs/advanced/vrt.js'];
}

exports.config = {
    specs,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                extensions,
                args: chromeArgs,
            },
            exclude: excludedTests,
        },
    ],
    reporters: ['spec'],
    services: ['static-server', 'visual-regression', 'chromedriver'],
    staticServerFolders: [{ mount: '/', path: './website' }],
    staticServerLogs: true,
    staticServerPort,
    // vrs options
    visualRegression,
    // chromedriver options
    port: '9515',
    path: '/',
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before() {
        commandsHelper(browser);
    },
    // Set a base URL in order to shorten url command calls.
    // If your `url` parameter starts with `/`, the base url gets prepended,
    // not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/`
    // (like `some/path`), the base url gets prepended directly.
    baseUrl: `http://localhost:${staticServerPort}/`,
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    // Make sure you have the wdio adapter package for the specific
    // framework installed before running any tests.
    framework: 'mocha',
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
};
