import { functionName, nameFunction } from './debuggable';

export interface EventHandler {
	(...args: any[]): void;
}

export class EventEmitter<EType extends string|symbol> {
	private _events: any = {};
	
	addListener(event: EType, handler: EventHandler): this {
		if (!this._events.hasOwnProperty(event)) {
			this._events[event] = [];
		}
		this._events[event].push(handler);
		return this;
	}
	
	addOnceListener(event: EType, handler: EventHandler): this {
		this.addListener(event, makeOnce(this, event, handler));
		return this;
	}
	
	emit(event: EType, ...args: any[]): this {
		if (!this._events.hasOwnProperty(event)) {
			return this;
		}
		for (const callback of this._events[event]) {
			callback(...args);
		}
		return this;
	}
	
	listenerCount(event: EType) {
		if (this._events.hasOwnProperty(event)) {
			return this._events[event].length;
		} else {
			return 0;
		}
	}
	
	removeAllListeners(event: EType): this {
		delete this._events[event];
		return this;
	}
	
	removeListener(event: EType, handler: EventHandler): this {
		const pos = this._events[event].indexOf(handler);
		if (pos !== -1) {
			this._events[event].splice(pos, 1);
		}
		return this;
	}
}

function makeOnce(event: EventEmitter<any>, eventName: any, handler: EventHandler) {
	return nameFunction(`once(${functionName(handler)})`, function self(...args: any[]) {
		event.removeListener(eventName, self);
		return handler(...args);
	});
}
