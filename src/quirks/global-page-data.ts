import { IS_NODE, isomorphicGlobal } from '../environment';

export type KVM = {[id: string]: any};

const symbol = Symbol.for('@@GongT/GlobalVariable');

export class GlobalVariable<DataType = KVM> {
	static getObject(parent: any) {
		if (!parent[symbol]) {
			Object.defineProperty(parent, symbol, {
				value: {},
				configurable: false,
				enumerable: false,
				writable: false,
			});
		}
		return parent[symbol];
	}
	
	private data: DataType;
	private parent: any;
	
	constructor(parent: any = isomorphicGlobal) {
		if (!parent) {
			throw TypeError('GlobalVariable must have a argument, eg. express.Request object.');
		}
		this.data = GlobalVariable.getObject(parent);
		
		Object.defineProperty(this, 'parent', {
			value: parent,
			configurable: false,
			enumerable: false,
			writable: false,
		});
		
		if (IS_NODE) {
			const {inspect} = require('util');
			Object.assign(this, {
				[inspect.custom]: (depth: any, opt: any) => {
					return 'GlobalVariable'
					       + '[<' + (typeof this.parent) + ' ' + (this.parent.constructor.name) + '>] '
					       + inspect(this.data, {
							...opt,
							depth: opt.depth - depth,
						});
				},
			});
		}
	}
	
	get<T extends keyof DataType>(name: T): DataType[T] {
		return this.data[name];
	}
	
	getObject(): DataType {
		return this.data;
	}
	
	has<T extends keyof DataType>(name: T): boolean {
		return this.data.hasOwnProperty(name);
	}
	
	set(varName: Partial<DataType>): void;
	set<T extends keyof DataType>(varName: T, value: DataType[T]): void;
	set<T extends keyof DataType>(name: Partial<DataType>|T, data?: DataType[T]): void {
		if (typeof name === 'string') {
			this.data[name] = data;
		} else {
			Object.assign(this.data, name);
		}
	}
	
	toJSON() {
		return JSON.stringify(this.data);
	}
	
	toString() {
		// !!! no line comment allow !!!
		return `/* GlobalVariable */(function(data) {
	var symbol = Symbol.for('@@GongT/GlobalVariable');
	if (window[symbol]) {
		if (Object.assign) {
			Object.assign(window[symbol], data);
		} else {
			var i;
			for (i in data) {
				window[symbol][i] = data[i];
			}
		}
	} else {
		window[symbol] = data;
	}
})`.replace(/\s*([{}()])\s*/g, '$1').replace(/\s*\n\s*/g, '') + `(${this.toJSON()});`;
	}
	
	unset(name: keyof DataType) {
		delete this.data[name];
	}
	
	get parentObject() {
		return this.parent;
	}
}
