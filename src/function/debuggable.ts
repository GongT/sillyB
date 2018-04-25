import { IS_BROWSER } from '../environment';

export interface MyFunction extends Function {
	displayName: string;
}

export function functionName(func: Function) {
	return (func as any).displayName || func.name;
}

export function nameFunction<T extends Function>(name: string, func: T): T&MyFunction {
	return Object.assign(func, {
		displayName: name,
		inspect() {
			return `[Function: ${name}]`;
		},
	});
}

export interface MyFunctionTest extends Function {
	displayName?: string;
}

export function assertFunctionName(func: MyFunctionTest) {
	if (!func.displayName && !func.name) {
		if (IS_BROWSER) {
			console.dir(func);
		} else {
			console.error(func.toString());
		}
		throw new TypeError('function must have name!');
	}
}
