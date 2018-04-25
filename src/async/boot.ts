import { QueueWait } from './queue-wait';
import { LOG_LEVEL } from '../debug/levels';
import { createLogger } from '../debug/create-logger';

export interface PostInitFunc {
	(): Promise<void>|void;
}

const debugInit = createLogger(LOG_LEVEL.DEBUG, 'init');
const infoInit = createLogger(LOG_LEVEL.INFO, 'init');
const debugBack = createLogger(LOG_LEVEL.DEBUG, 'bg');
const infoBack = createLogger(LOG_LEVEL.INFO, 'bg');

const readyState = new QueueWait('ApplicationStart');
let postInitComplete = false;
let postInitQueue: {func: PostInitFunc; title: string;}[] = [];
let globalErrorHandler = (e: Error) => {
	throw e;
};

const totalReady = readyState.wait().then(() => {
	infoInit('wait app start: ready.');
}).then(runPost).catch((e) => {
	globalErrorHandler(e);
});

async function runPost() {
	for (const {title, func} of postInitQueue) {
		runPostInit(title, func);
	}
	infoBack('all post init job complete.');
	postInitComplete = true;
	postInitQueue = null;
}

export function isAppReady(): boolean {
	return readyState.finished && postInitComplete;
}

export function waitAppStart(): Promise<void> {
	return totalReady;
}

export function backgroundJob(title: string, runner: PostInitFunc): void;
/** @deprecated*/
export function backgroundJob(runner: PostInitFunc): void;

export function backgroundJob(title: string|PostInitFunc, runner?: PostInitFunc) {
	if (!runner) {
		runner = title as PostInitFunc;
		title = 'anonymous post init';
	}
	debugBack('new background job: %s', title);
	if (readyState.finished) {
		runPostInit(title as string, runner);
	} else {
		postInitQueue.push({
			title: title as string,
			func: runner,
		});
	}
}

function runPostInit(title: string, runner: PostInitFunc) {
	const p = runner();
	if (p && p.then) {
		p.then(() => {
			debugInit('init job ok: %s', title);
		}, (e) => {
			debugInit('init job failed: %s -> %s', title, e.message);
			globalErrorHandler(e);
		});
	} else {
		debugInit('init job ok: %s', title);
	}
	return p;
}

export function pushInitList(title: string, p: PromiseLike<any>) {
	if (readyState.finished) {
		throw new Error(`try to init "${title}", but app already started.`);
	}
	debugInit('new job: %s', title);
	readyState.push();
	p.then(() => {
		if (readyState.finished) {
			return;
		}
		debugInit('init job ok: %s', title);
		readyState.pop();
	}, (e) => {
		if (readyState.finished) {
			return;
		}
		debugInit('init job failed: %s -> %s', title, e.message);
		readyState.pop(e);
	});
}

export function trapInitError(handler: (e: Error) => never) {
	globalErrorHandler = handler;
}
