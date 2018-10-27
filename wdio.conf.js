/* global browser */
const chromedriver = require('chromedriver');
const tcpPortUsed = require('tcp-port-used');

const commandsHelper = require('./src/commands');
const visualRegression = require('./src/vrsConfiguration');
const audioDetector = require('./src/audio-detector');

const staticServerPort = 4242;
const chromeArgs = ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'];
let specs = ['src/specs/basic/**/*.js', 'src/specs/advanced/**/*.js'];
let excludedTests = [];
let extensions = [audioDetector.extension];

if (process.env.CI || process.env.TRAVIS) {
    chromeArgs.push('--headless');
    // disabled because not working on Travis CI
    excludedTests = [
        // cannot test vrs on travis - different font rendering
        'src/specs/advanced/vrs.js',
        // cannot use extensions in headless mode
        'src/specs/advanced/audio.js',
    ];
    // cannot use extensions in headless mode
    extensions = [];
}

if (process.env.CONSOLIDATE) {
    // set when running 'yarn consolidate'
    // means that we should override default screenshots
    // so might as well just run this test
    specs = ['src/specs/advanced/vrs.js'];
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
    services: ['static-server', 'visual-regression'],
    staticServerFolders: [{ mount: '/', path: './website' }],
    staticServerLogs: true,
    staticServerPort,
    visualRegression,
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before() {
        commandsHelper(browser);
    },
    onPrepare() {
        return tcpPortUsed.check(4444, '127.0.0.1').then(inUse => {
            if (inUse) {
                throw new Error(
                    'Port 4444 is already in use by another service.'
                );
            }

            return chromedriver.start(
                ['--port=4444', '--url-base=/wd/hub'],
                true
            );
        });
    },
    onComplete() {
        chromedriver.stop();
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
    },
};
