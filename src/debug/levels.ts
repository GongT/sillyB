export enum LOG_LEVEL {
	EMERG = 0,
	ERROR,
	WARN,
	NOTICE,
	INFO,
	DEBUG,
	DATA,
	SILLY,
}

export const levels = {
	EMERG: LOG_LEVEL.EMERG,
	ERROR: LOG_LEVEL.ERROR,
	WARN: LOG_LEVEL.WARN,
	NOTICE: LOG_LEVEL.NOTICE,
	INFO: LOG_LEVEL.INFO,
	DEBUG: LOG_LEVEL.DEBUG,
	DATA: LOG_LEVEL.DATA,
	SILLY: LOG_LEVEL.SILLY,
};

/** @internal */
export let currentLevel: LOG_LEVEL = LOG_LEVEL.DEBUG;

export function setCurrentLevel(l: LOG_LEVEL) {
	currentLevel = l;
}

export function getCurrentLevel() {
	return currentLevel;
}
