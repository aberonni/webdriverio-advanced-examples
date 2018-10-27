require('dotenv').load();

const { config } = require('./wdio.conf');

// delete chromeriver specific options
delete config.port;
delete config.path;

exports.config = {
    ...config,
    capabilities: [
        {
            os: 'OS X',
            os_version: 'Mojave',
            browserName: 'Chrome',
            browser_version: '69.0',
            exclude: [
                'src/specs/advanced/vrs.js',
                'src/specs/advanced/audio.js',
            ],
        },
    ],
    services: ['static-server', 'browserstack'],
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    browserstackLocal: true,
};
