const tcpPortUsed = require('tcp-port-used');
const { config } = require('./wdio.conf');

// delete chromeriver specific options
delete config.port;
delete config.path;

const { capabilities } = config;

capabilities.forEach(capability => {
    // can't test vrs on zalenium
    // because different environments yield slightly different visual results
    capability.exclude.push('src/specs/advanced/vrs.js');
});

// This configuration is used to run tests with zalenium
exports.config = {
    ...config,
    capabilities,
    services: ['static-server'],
    onPrepare() {
        return tcpPortUsed.check(4444, '127.0.0.1').then(inUse => {
            if (!inUse) {
                console.error('Could not find Zalenium running on port 4444.');
                console.error(
                    'Run "yarn zalenium" in a separate terminal window and then try again.'
                );
                process.exit(1);
            }
        });
    },
    baseUrl: `http://host.docker.internal:${config.staticServerPort}/`,
};
