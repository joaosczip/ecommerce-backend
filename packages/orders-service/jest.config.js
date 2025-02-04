const baseJestConfig = require("../../jest.config");
const { config } = require("dotenv");
config();

module.exports = {
	...baseJestConfig,
	rootDir: ".",
	testRegex: "test/.*\\.spec\\.ts$",
	moduleNameMapper: {
		"@modules/(.*)": "<rootDir>/src/modules/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
};
