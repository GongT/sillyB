import {ValueCheckerAbstract, ValueSanitizerAbstract} from "./base";
export class ValueCheckerArray extends ValueCheckerAbstract {
	every(sub_checker: ValueCheckerAbstract) {
		const check = sub_checker.getFunction();
		this.list.push({
			debugTitle: 'every',
			validate (s) {
				return s.every(check, this);
			},
		});
		return this;
	}
	
	min(min: number) {
		this.list.push({
			debugTitle: 'min',
			validate (s) {
				return s.length >= min;
			},
		});
		return this;
	}
	
	max(max: number) {
		this.list.push({
			debugTitle: 'max',
			validate (s) {
				return s.length <= max;
			},
		});
		return this;
	}
}
export class ValueSanitizerArray extends ValueSanitizerAbstract {
	
}
