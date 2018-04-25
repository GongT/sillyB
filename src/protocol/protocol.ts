export interface Protocol {
}

export interface ApiResponse extends Protocol {
	errorDescription?: string;
	errorStack?: string;
	message?: string;
	status: STATUS_CODE;
	statusName?: keyof STATUS_CODE;
}

export interface ApiRequest extends Protocol {
	
}

export enum STATUS_CODE {
	SUCCESS = 0,
	UNKNOWN_ERROR,
	NO_RESPONSE,
	NOT_IMPLEMENT,
	INVALID_INPUT,
	DATA_NOT_EXISTS,
	LOGIN_REQUIRED,
	HTTP_ERROR,
}

export interface ErrorMap {
	[id: string]: number;
}

export type ErrorDescriber = (code: string, err?: Error) => string;
export type ExceptionDescriber = (code: string, stack: string, err?: Error) => string|void;
let errorDesc: ErrorDescriber = defaultDescriber;
let exceptionDesc: ExceptionDescriber;

export function getErrorMessage(code: STATUS_CODE, error?: Error) {
	if (typeof code === 'number') {
		return errorDesc(STATUS_CODE[code] || code.toString(), error);
	} else if (exceptionDesc) {
		return exceptionDesc('' + code, error? error.stack || '**no stack info**' : '', error) || `***NO DESCRIPTION ABOUT ERROR ${code}***`;
	} else {
		return `***NO DESCRIPTION ABOUT ERROR ${code}, NO HANDLER***`;
	}
}

export function registerErrorDescriber(fn: ErrorDescriber) {
	errorDesc = fn;
}

export function registerExceptionDescriber(fn: ExceptionDescriber) {
	exceptionDesc = fn;
}

function defaultDescriber(code: string) {
	return `***NO DESCRIPTION ABOUT ERROR ${code}***`;
}
