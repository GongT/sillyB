export interface InitFunc<O, T> {
	(this: O): T;
}

export function initOnRead<O, T extends keyof O>(target: any, propertyKey: T, init: InitFunc<O, O[T]>) {
	if (target.hasOwnProperty(propertyKey)) {
		return;
	}
	Object.defineProperty(target, propertyKey, {
		configurable: true,
		get(): T {
			const data = init.call(target);
			delete target[propertyKey];
			target[propertyKey] = data;
			return data;
		},
		set(v: T) {
			delete target[propertyKey];
			target[propertyKey] = v;
		},
	});
}

export function InitOnRead<O, T extends keyof O>(init: InitFunc<O, O[T]>): PropertyDecorator {
	return (target: O, propertyKey: T) => {
		initOnRead<O, T>(target, propertyKey as any, init);
	};
}
