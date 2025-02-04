const baseJestConfig = require("../../jest.config");

module.exports = {
	...baseJestConfig,
	rootDir: ".",
	testRegex: "test/(?!e2e/).*\\.spec\\.ts$",
	moduleNameMapper: {
		"@modules/(.*)": "<rootDir>/src/modules/$1",
	},
};
