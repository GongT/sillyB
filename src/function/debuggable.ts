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
