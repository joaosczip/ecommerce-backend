const baseJestConfig = require("../../jest.config");

module.exports = {
	...baseJestConfig,
	rootDir: ".",
	testRegex: "test/.*\\.spec\\.ts$",
};
