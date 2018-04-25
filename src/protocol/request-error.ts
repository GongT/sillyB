import { createLogger } from '../debug/create-logger';
import { LOG_LEVEL } from '../debug/levels';
import { ApiResponse, getErrorMessage, STATUS_CODE } from './protocol';
import { HTTP } from './request';

const warn = createLogger(LOG_LEVEL.WARN, 'ErrorResponse');

export interface ErrorResponse extends ApiResponse {
	errorDescription?: string;
	errorStack?: string;
	message: string;
	status: STATUS_CODE;
	statusName: keyof STATUS_CODE;
}

export class RequestError {
	static internal(err: RequestError|Error): RequestError {
		if (err instanceof RequestError) {
			return err;
		}
		const newErr = new RequestError(-HTTP.INTERNAL_SERVER_ERROR, '', err);
		newErr._friendlyMessage = newErr._errorDesc;
		newErr._errorDesc = err.message;
		if (err.stack) {
			newErr.stack = err.stack;
		} else {
			newErr.stack = 'Error: request failed';
		}
		return newErr;
	}
	
	static standardError(code: STATUS_CODE|number, extraMessage: Error|string) {
		if (extraMessage instanceof Error) {
			const ret = new RequestError(code, getErrorMessage(STATUS_CODE.UNKNOWN_ERROR, extraMessage));
			ret._errorDesc = extraMessage.message;
			ret.stack = extraMessage.stack;
			return ret;
		} else {
			return new RequestError(code, extraMessage);
		}
	}
	
	private _errorDesc: string;
	private _friendlyMessage: string;
	protected err_code: number;
	protected error: Error;
	
	constructor(code: STATUS_CODE|number, message: string, e = new Error()) {
		if (e && e.stack) {
			this._stack = e.stack.replace(/^.*\n.*\n/, '');
		} else {
			this._stack = '**no stack info**';
		}
		this._errorDesc = getErrorMessage(code, e);
		this._friendlyMessage = message;
		this.err_code = code;
	}
	
	response(): ErrorResponse {
		return {
			status: this.code as any,
			message: this.message,
			statusName: (STATUS_CODE[this.code] || 'UNEXPECTED ERROR') as any,
			errorDescription: this._errorDesc,
			errorStack: this.stack,
		};
	}
	
	toJSON() {
		return this.response();
	};
	
	private _stack: string;
	
	get stack(): string {
		if (!this._stack) {
			this.stack = this.error.stack;
		}
		return (this.constructor['name'] || 'Error') + ': ' + this._errorDesc + '\n' + this._stack;
	}
	
	set stack(v) {
		if (typeof v === 'string') {
			this._stack = v.replace(/^.*\n/, '');
		} else {
			warn('warn: modify error stack, but not a string.');
			this._stack = v;
		}
	}
	
	public get code(): number {
		return this.err_code;
	}
	
	public get message(): string {
		return this._friendlyMessage;
	}
}
