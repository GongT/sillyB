import {pad2} from "../strings/pad";

export function storagePath(date = new Date()) {
	return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}${pad2(date.getDate())}/${pad2(date.getHours())}`;
}
