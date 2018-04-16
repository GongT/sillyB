export interface AnyConstructor extends Function {
	new(...args: any[]): any,
}

export function Singleton(preventDuplicateNew = false) {
	return function Singleton<T extends AnyConstructor>(cls: T): T {
		const singleton = Symbol('@@singleton/' + cls.name);
		Object.defineProperty(cls, 'singleton', {
			get() {
				return this[singleton];
			},
			configurable: true,
			enumerable: false,
		});
		return <any>new Proxy<T>(cls, {
			construct(target: T, argArray: any, newTarget?: any) {
				if (cls.hasOwnProperty(singleton)) {
					if (preventDuplicateNew) {
						throw new TypeError('Cannot create multiple instance of singleton class `' + cls.name + '`.');
					}
					return (cls as any)[singleton];
				}
				return (cls as any)[singleton] = new target(...argArray);
			},
		});
	};
}
