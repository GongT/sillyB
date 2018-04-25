import { nameFunction } from './debuggable';

export interface MyDelayCallback<Argument> {
	displayName?: string;
	
	(param: Argument): void;
}

export class DelayCallbackList<Argument> {
	private delayArgument: Argument = null;
	private delayComplete: boolean = false;
	
	protected list: MyDelayCallback<Argument>[] = [];
	
	add(item: MyDelayCallback<Argument>, name?: string) {
		if (name) {
			nameFunction(name, item);
		}
		if (this.delayComplete) {
			item(this.delayArgument);
		} else {
			this.list.push(item);
		}
	}
	
	run(argument: Argument) {
		if (this.delayComplete) {
			throw new Error('call to delay callback twice!');
		}
		this.delayComplete = true;
		this.delayArgument = argument;
		this.list.forEach((cb, i) => {
			cb(argument);
		});
		delete this.list;
	}
}
