import { isomorphicGlobal } from '../environment';

if (!isomorphicGlobal.config) {
	isomorphicGlobal.config = {};
}

export class TypedConfig<DataType> {
	private isDefault: Record<keyof DataType, boolean>;
	private map: DataType;
	
	constructor(namespace: string = 'defaults') {
		if (!isomorphicGlobal.config[namespace]) {
			isomorphicGlobal.config[namespace] = {};
		}
		this.map = isomorphicGlobal.config[namespace];
	}
	
	freeze() {
		Object.freeze(this.map);
		Object.freeze(this.isDefault);
	}
	
	has<K extends keyof DataType>(key: K): boolean {
		return this.map.hasOwnProperty(key);
	}
	
	merge(part: Partial<DataType>) {
		Object.assign(this.map, part);
		for (const [k, v] of Object.entries(part) as any) {
			this.overwrite(k, v);
		}
	}
	
	optional<K extends keyof DataType>(key: K, def: DataType[K]): DataType[K] {
		return this.map.hasOwnProperty(key)? this.map[key] : def;
	}
	
	overwrite<K extends keyof DataType>(key: K, value: DataType[K]) {
		this.map[key] = value;
		delete this.isDefault[key];
	}
	
	require<K extends keyof DataType>(key: K): DataType[K] {
		if (this.map.hasOwnProperty(key)) {
			return this.map[key];
		} else {
			throw new Error(`Required key [${key}] not exists`);
		}
	}
	
	set<K extends keyof DataType>(key: K, value: DataType[K]) {
		if (this.map.hasOwnProperty(key) && !this.isDefault[key]) {
			throw new Error(`Can not re-set on key [${key}]`);
		} else {
			this.map[key] = value;
			delete this.isDefault[key];
		}
	}
	
	setDefault<K extends keyof DataType>(key: K, value: DataType[K]) {
		if (this.map.hasOwnProperty(key)) {
			return;
		}
		this.map[key] = value;
		this.isDefault[key] = true;
	}
}
