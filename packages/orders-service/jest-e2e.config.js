const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	testRegex: "test/e2e/.*\\.spec\\.ts$",
};
