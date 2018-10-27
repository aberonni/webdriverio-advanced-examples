const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');

const getScreenshotName = basePath => context => {
    const { type } = context;
    const { title } = context.test;
    const browserViewport = context.meta.viewport;
    const { width, height } = browserViewport;

    return path.join(
        process.cwd(),
        basePath,
        `${title}_${type}_${width}x${height}.png`
    );
};

const compareScreenshotsFunction = new VisualRegressionCompare.LocalCompare({
    referenceName: getScreenshotName('screenshots/baseline'),
    screenshotName: getScreenshotName('screenshots/latest'),
    diffName: getScreenshotName('screenshots/diff'),
    misMatchTolerance: 0.01,
});

const updateBaselineFunction = new VisualRegressionCompare.SaveScreenshot({
    screenshotName: getScreenshotName('screenshots/baseline'),
});

module.exports = {
    // CONSOLIDATE=1 is set in the script 'yarn consolidate'
    // This script uses the simple SaveScreenshot function that always update baseline,
    // instead of the LocalCompare function that compares agains the baseline
    compare: process.env.CONSOLIDATE
        ? updateBaselineFunction
        : compareScreenshotsFunction,
    viewportChangePause: 1500,
    viewports: [{ width: 1024, height: 768 }, { width: 640, height: 480 }],
};
