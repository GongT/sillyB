import { pad2 } from '../strings/pad';

export function dateToChineseFormat(date: Date) {
	let ret = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
	ret += ` ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
	
	return ret;
}
