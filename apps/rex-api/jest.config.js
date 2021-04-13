module.exports = {
	displayName: 'rex-api',
	preset: '../../jest.preset.js',
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/apps/rex-api',
};
