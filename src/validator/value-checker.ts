import {ValueSanitizerAbstract, ValueCheckerAbstract} from "./base";
import {ValueSanitizerString, ValueCheckerString, stringToBoolean} from "./string";
import {ValueCheckerDate, ValueSanitizerDate} from "./date";
import {ValueCheckerArray, ValueSanitizerArray} from "./array";
import {ValueCheckerBoolean, ValueSanitizerBoolean} from "./boolean";
import {ValueCheckerNumber, ValueSanitizerNumber} from "./number";
import {ValueCheckerObject, ValueSanitizerObject} from "./object";

export class ValueChecker extends ValueCheckerAbstract {
	isString() {
		this.list.push({
			debugTitle: 'isString',
			validate: (s) => {
				return typeof s === 'string';
			},
		});
		return new ValueCheckerString(this);
	}
	
	isNumber() {
		this.list.push({
			debugTitle: 'isNumber',
			validate: (s) => {
				return typeof s === 'number';
			},
		});
		return new ValueCheckerNumber(this);
	}
	
	isBoolean() {
		this.list.push({
			debugTitle: 'isBoolean',
			validate: (s) => {
				return typeof s === 'boolean';
			},
		});
		return new ValueCheckerBoolean(this);
	}
	
	isDate() {
		this.list.push({
			debugTitle: 'isDate',
			validate: (s) => {
				return s instanceof Date;
			},
		});
		return new ValueCheckerDate(this);
	}
	
	isArray() {
		this.list.push({
			debugTitle: 'isArray',
			validate(this: any, s: any[]) {
				return Array.isArray(s);
			},
		});
		return new ValueCheckerArray(this);
	}
	
	isObject() {
		this.list.push({
			debugTitle: 'isObject',
			validate: (s) => {
				return s && typeof s === 'object';
			},
		});
		return new ValueCheckerObject(this);
	}
}

export class ValueSanitizer extends ValueSanitizerAbstract {
	toString() {
		this.list.push({
			debugTitle: 'toString',
			sanitize: (s) => {
				return s + '';
			},
		});
		return new ValueSanitizerString(this);
	}
	
	toInt() {
		this.list.push({
			debugTitle: 'toInt',
			sanitize: (s) => {
				return parseInt(s);
			},
		});
		return this;
	}
	
	toFloat() {
		this.list.push({
			debugTitle: 'toFloat',
			sanitize: (s) => {
				return parseFloat(s);
			},
		});
		return new ValueSanitizerNumber(this);
	}
	
	toBoolean() {
		this.list.push({
			debugTitle: 'toBoolean',
			sanitize: (s) => {
				if (typeof s === 'boolean') {
					return s;
				}
				if (typeof s === 'string') {
					return stringToBoolean(s);
				}
				throw new TypeError(`can't convert ${s} to boolean.`);
			},
		});
		return new ValueSanitizerBoolean(this);
	}
	
	toDate() {
		this.list.push({
			debugTitle: 'toDate',
			sanitize: (s) => {
				try {
					return new Date(s);
				} catch (e) {
					throw new TypeError(`can't convert ${s} to boolean.`);
				}
			},
		});
		return new ValueSanitizerDate(this);
	}
	
	toArray() {
		this.list.push({
			debugTitle: 'toArray',
			sanitize: (s) => {
				return Array.isArray(s)? s : [s];
			},
		});
		return new ValueSanitizerArray(this);
	}
	
	toObject() {
		return new ValueSanitizerObject(this);
	}
}
