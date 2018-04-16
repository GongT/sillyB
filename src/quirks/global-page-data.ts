import { isomorphicGlobal } from '../environment';

export type KVM = {[id: string]: any};

export class GlobalVariable {
	static get(parent: any, varName: string): any {
		return GlobalVariable.getObject(parent)[varName];
	}
	
	/**
	 * @param parent express.Request|Window
	 **/
	static getObject(parent: any) {
		if (!parent['__PAGE_DATA__']) {
			Object.defineProperty(parent, '__PAGE_DATA__', {
				value: {},
				configurable: false,
				enumerable: false,
				writable: false,
			});
		}
		return parent['__PAGE_DATA__'];
	}
	
	static set(parent: any, varName: KVM): void;
	
	static set(parent: any, varName: string, content: any): void;
	
	static set(parent: any, varName: KVM|string, content?: any): void {
		if (typeof varName === 'string') {
			return GlobalVariable.getObject(parent)[varName] = content;
		} else {
			Object.assign(GlobalVariable.getObject(parent), varName);
		}
	}
	
	private data: any;
	private parent: any;
	
	/**
	 * @param parent express.Request|Window
	 **/
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
	}
	
	get(name: string) {
		return this.data[name];
	}
	
	getObject() {
		return this.data;
	}
	
	has(name: string) {
		return this.data.hasOwnProperty(name);
	}
	
	inspect(depth: any, opt: any) {
		return 'GlobalVariable'
		       + '[<' + (typeof this.parent) + ' ' + (this.parent.constructor.name) + '>] '
		       + require('util').inspect(this.data, {
				...opt,
				depth: opt.depth - depth,
			});
	}
	
	set(varName: KVM): void;
	set(varName: string, value: any): void;
	set(name: KVM|string, data?: any): void {
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
		return `(function(data) {
	if (window.__PAGE_DATA__) {
		if (Object.assign) {
			Object.assign(window.__PAGE_DATA__, data);
		} else {
			var i;
			for (i in data) {
				window.__PAGE_DATA__[i] = data[i];
			}
		}
	} else {
		window.__PAGE_DATA__ = data;
	}
})`.replace(/\s*([{}()])\s*/g, '$1').replace(/\s*\n\s*/g, '') + `(${this.toJSON()});`;
	}
	
	unset(name: string) {
		delete this.data[name];
	}
	
	get parentObject() {
		return this.parent;
	}
}
