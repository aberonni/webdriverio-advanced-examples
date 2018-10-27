const { config } = require('./wdio.conf');

const address = process.env.VSCODE ? '=127.0.0.1:5859' : '';

// This configuration is used by vscode for debugging
exports.config = {
    ...config,
    maxInstances: 1,
    execArgv: [`--inspect-brk${address}`],
};
