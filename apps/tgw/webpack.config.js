const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
	/* mapped paths to share */
]);

const share = mf.share;
mf.setInferVersion(true);
module.exports = {
	output: {
		uniqueName: 'tgw',
		publicPath: 'auto',
	},
	optimization: {
		runtimeChunk: false,
		minimize: true,
	},
	resolve: {
		alias: {
			...sharedMappings.getAliases(),
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'tgw',
			filename: 'remoteEntry.js',
			exposes: {
				'./Module': 'apps/tgw/src/app/remote-entry/entry.module.ts',
			},
			shared: share({
				'@angular/core': { singleton: true, strictVersion: true },
				'@angular/common': { singleton: true, strictVersion: true },
				'@angular/common/http': { singleton: true, strictVersion: true },
				'@angular/router': { singleton: true, strictVersion: true },
				...sharedMappings.getDescriptors(),
			}),
		}),
		sharedMappings.getPlugin(),
	],
};
