import {ValueCheckerAbstract, ValueSanitizerAbstract} from "./base";
import {ValueChecker} from "./value-checker";
export class ValueCheckerObject extends ValueCheckerAbstract {
	private optionalList: {[key: string]: any} = {};
	
	field(name: string) {
		const fork = new ValueChecker();
		const validate = fork.getFunction(name);
		this.list.push({
			debugTitle: 'part',
			validate (this: any, s) {
				if (s.hasOwnProperty(name)) {
					return validate.call(this, s[name]);
				} else if (this.optionalList.hasOwnProperty(name)) {
					return this.optionalList[name];
				} else {
					throw new Error(`missing required key: ${name}`);
				}
			},
		});
		return fork;
	}
	
	optionalField(keyName: string, defaultValue: any = null) {
		this.optionalList[keyName] = defaultValue;
		return this.field(keyName);
	}
}
export class ValueSanitizerObject extends ValueSanitizerAbstract {
	
}
