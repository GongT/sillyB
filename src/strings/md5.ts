import { IS_BROWSER, IS_NODE } from '../environment';

if (IS_NODE) {
	const {createHash} = require('crypto');
	module.exports.md5 = (data: string) => {
		return createHash('md5').update(data).digest().toString('hex');
	};
} else if (IS_BROWSER) {
	module.exports.md5 = require('md5');
}

export declare function md5(data: string): string;
