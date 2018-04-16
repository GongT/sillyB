import { currentLevel, LOG_LEVEL } from './levels';
import { nameFunction } from '../function/debuggable';
import { IS_BROWSER } from '../environment';
import { Colors } from './colors';

export interface IDebuggerPrinter {
	(formatter: any|string, ...args: any[]): void;
}

export interface IDebuggerLogger {
	(formatter: string, ...args: any[]): void;
	
	(formatter: object): void;
}

export interface IDebugger extends IDebuggerLogger {
	readonly enabled: boolean;
	readonly fn: IDebuggerPrinter;
	readonly level: LOG_LEVEL;
}

let debugHandler: IDebuggerPrinter = console.error.bind(console);

export function setLogHandler(handler: IDebuggerPrinter) {
	debugHandler = handler;
}

export function createLogger(level: LOG_LEVEL, title: string): IDebugger {
	const enabled = level <= currentLevel;
	let name = 'logger:' + title + ':' + LOG_LEVEL[level];
	if (!enabled) {
		name += '(disabled)';
	}
	const levelName = LOG_LEVEL[level];
	const [colorStart, colorEnd] = Colors[LOG_LEVEL[level]];
	const colorMessage = level < LOG_LEVEL.INFO;
	
	const logger: IDebuggerLogger = function (formatterOrData: string|any, ...args: any[]) {
		if (args.length === 0 && typeof formatterOrData !== 'string') {
			return debugHandler(`[${colorStart}${levelName}${colorEnd}][${title}] ${colorStart}%${IS_BROWSER? 'o' : 'j'}${colorEnd}`, formatterOrData);
		} else {
			if (IS_BROWSER) {
				formatterOrData = formatterOrData.replace(/%j/g, '%o');
				return debugHandler(`[${colorStart}${levelName}${colorEnd}][${title}] ${formatterOrData}`, ...args);
			} else if (colorMessage) {
				return debugHandler(`[${colorStart}${levelName}${colorEnd}][${title}] ${colorStart}${formatterOrData}${colorEnd}`, ...args);
			}
		}
	};
	return Object.assign(nameFunction(name, logger), {
		fn: debugHandler,
		level,
		enabled,
	});
}

export function debugType(object: any): string|object {
	if (typeof object === 'object' && object && !Array.isArray(object)) {
		const debug: any = {};
		Object.keys(object).forEach((i) => {
			debug[i] = debugTypeInObj(object[i]);
		});
		return debug;
	} else {
		return debugTypeInObj(object);
	}
}

function debugTypeInObj(object: any) {
	switch (typeof object) {
	case 'boolean':
		return `[Boolean ${object? 'true' : 'false'}]`;
	case 'string':
		return `[String ${object.substr(0, 6)}..(${object.length})]`;
	case 'number':
		return `[Number ${object}]`;
	case 'undefined':
		return '[undefined]';
	case 'function':
		return `[Function ${object.displayName || object.name || 'anonymous'}]`;
	case 'symbol':
		return `[${object.toString()}]`;
	case 'object':
		if (object === null) {
			return '[Object null]';
		}
		if (Array.isArray(object)) {
			return `[Array [${object.slice(0, 2).toString()}]...(${object.length})]`;
		}
		return `[Object ${object.toString()}]`;
	default:
		return '[UnknownType]';
	}
}
