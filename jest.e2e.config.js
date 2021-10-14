module.exports = {
	preset: 'jest-playwright-preset',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			diagnostics: false,
			tsconfig: 'tsconfig.json'
		}
	},
	testMatch: ['<rootDir>/**/*.e2e.js', '<rootDir>/**/*.e2e.ts'],
	testEnvironmentOptions: {
		'jest-playwright': {
			browsers: ['chromium'],
			launchOptions: {
				headless: true
			},
			contextOptions: {
				recordVideo: {
					dir: process.env.ARTIFACTS_DIR || '/tmp/test-results',
				}
			},
			viewport: {
				width: 1920,
				height: 1080
			}
		}
	},
	testResultsProcessor: 'jest-teamcity-reporter'
}
