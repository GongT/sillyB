import { IS_NODE } from '../environment';

const bold: [number, number] = [1, 22];
const dim: [number, number] = [2, 22];
const red: [number, number] = [1, 39];
const reset: [number, number] = [0, 0];
const magenta: [number, number] = [5, 39];
const yellow: [number, number] = [3, 39];
const cyan: [number, number] = [6, 39];
const green: [number, number] = [2, 39];

const TerminalColors: ColorMap = {
	EMERG: terminal(bold, red),
	ERROR: terminal(red),
	WARN: terminal(magenta),
	NOTICE: terminal(yellow),
	INFO: terminal(cyan),
	DEBUG: terminal(reset),
	DATA: terminal(dim, green),
	SILLY: terminal(dim),
	reset: terminal(reset),
};

const BrowserColors: ColorMap = {
	EMERG: browser('color:red;font-weight:bold;font-size:xx-large;'),
	ERROR: browser('color:red;'),
	WARN: browser('color:magenta;'),
	NOTICE: browser('color:#ff5400;'),
	INFO: browser('color:#4fbdff;'),
	DEBUG: browser('color:#626262;'),
	DATA: browser('color:#01a900;'),
	SILLY: browser('color:#c1c1c1;'),
	reset: browser('color:normal'),
};

export const Colors = IS_NODE? TerminalColors : BrowserColors;
export const ColorPlaceHolder = IS_NODE? '%s' : '%c';

export interface ColorMap {
	[level: string]: [string, string]
}

function terminal(...colors: [number, number][]) {
	const ret: [string, string] = ['\x1B[', '\x1B['];
	for (const [set, reset] of colors) {
		ret[0] += set + ';';
		ret[1] += reset + ';';
	}
	ret[0] = ret[0].replace(/;$/, 'm');
	ret[1] = ret[1].replace(/;$/, 'm');
	return ret;
}

const browserReset: {[id: string]: string} = {color: 'reset'};

function browser(str: string): [string, string] {
	const reset = str.split(';').map((item) => {
		return item.split(':', 1)[0].trim();
	}).map((k) => {
		if (browserReset[k]) {
			return k + ':' + browserReset[k];
		} else {
			return k + ':normal';
		}
	}).join(';');
	return [str, reset];
}
