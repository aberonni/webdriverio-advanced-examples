const { config } = require('./wdio.conf');

// delete chromeriver specific options
delete config.port;
delete config.path;

exports.config = {
    ...config,
    specs: ['src/specs/basic/**/*.js'],
    port: 4723,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'safari',
            deviceName: 'iPhone XS Max',
            platformVersion: '12.0',
            platformName: 'iOS',
        },
    ],
    services: ['static-server', 'appium'],
    appium: {
        args: {
            address: '127.0.0.1',
            commandTimeout: '22200',
            sessionOverride: true,
            debugLogSpacing: true,
        },
    },
};
