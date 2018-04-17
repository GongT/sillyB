import { createLogger } from '../debug/create-logger';
import { LOG_LEVEL } from '../debug/levels';

const log = createLogger(LOG_LEVEL.DEBUG, 'verify');

export class ValidatorAssertError extends Error {
	constructor(protected vName: string, protected lastValidator: string) {
		super(`valueOf "${vName}" checkFailed: "${lastValidator}"`);
	}
	
	get validatorName() {
		return this.lastValidator;
	}
	
	get valueName() {
		return this.vName;
	}
}

export interface ArgumentFilter {
	(object: any, valueName?: string): boolean;
}

export interface ArgumentFilterAssert {
	/** @throws */
	(object: any, valueName?: string): void;
}

export interface ArgumentWorker<T> {
	(object: T, valueName?: string): T;
}

export interface SanitizerConfig {
	argument?: any[]|IArguments;
	debugTitle: string;
	sanitize: (value: any, ...args: any[]) => any;
}

export interface ValidateConfig {
	argument?: any[]|IArguments;
	debugTitle: string;
	validate: (value: any, ...args: any[]) => boolean;
}

export interface ValueValidatorObject {
	getAssert(): ArgumentFilterAssert;
	
	getFunction(): ArgumentFilter;
}

export interface ValueSanitizerObject {
	getFunction(): ArgumentWorker<any>;
}

export abstract class ValueAbstract {
	protected list: (ValidateConfig|SanitizerConfig)[];
	
	constructor(ref?: ValueAbstract) {
		if (ref) {
			this.list = ref.list;
			return this;
		} else {
			this.list = [];
			return this;
		}
	}
}

export abstract class ValueCheckerAbstract extends ValueAbstract implements ValueValidatorObject {
	protected list: ValidateConfig[];
	
	getAssert(valueName: string = 'unknown value name'): ArgumentFilterAssert {
		const list = this.list;
		return function valueAssert(value: any, vName: string = valueName) {
			let ret = true, last = '';
			try {
				for (const {debugTitle, validate, argument} of list) {
					last = debugTitle;
					if (argument) {
						ret = validate(value, ...argument);
					} else {
						ret = validate(value);
					}
					if (!ret) {
						break;
					}
				}
			} catch (e) {
				e.message = `[ValueChekcer ${last || '???'}]` + e.message;
				throw e;
			}
			
			if (!ret) {
				throw new ValidatorAssertError(vName, last);
			}
		};
	}
	
	/**
	 * will not throw if check fail
	 * but will throw internal error (eg. null.xxx)
	 */
	getFunction(valueName: string = ''): ArgumentFilter {
		const check = this.getAssert(valueName);
		return function valueChecker(value: any, vName?: string) {
			try {
				check(value, vName);
				return true;
			} catch (e) {
				if (e instanceof ValidatorAssertError) {
					log(e.message);
					return false;
				} else {
					throw e;
				}
			}
		};
	}
	
	byCallback(fn: (...arg: any[]) => boolean, ...args: any[]) {
		this.list.push({
			debugTitle: 'customCallback',
			validate: fn,
			argument: args,
		});
		return this;
	}
}

export abstract class ValueSanitizerAbstract extends ValueAbstract implements ValueSanitizerObject {
	protected list: SanitizerConfig[];
	
	getFunction(): ArgumentWorker<any> {
		const list = this.list;
		return function (value) {
			let ret: any = value;
			list.forEach(({sanitize, argument}) => {
				ret = sanitize(ret, ...Array.prototype.slice.call(argument));
			});
			return ret;
		};
	}
	
	byCallback(fn: (...arg: any[]) => any, ...args: any[]) {
		this.list.push({
			debugTitle: 'customCallback',
			sanitize: fn,
			argument: args,
		});
		return this;
	}
	
}
