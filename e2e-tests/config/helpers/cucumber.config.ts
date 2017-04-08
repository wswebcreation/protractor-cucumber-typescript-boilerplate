export const defaultTimeout: number = 10000;

module.exports = function () {
    // Default timeout for each cucumber step
    this.setDefaultTimeout(defaultTimeout);
};