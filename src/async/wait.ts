import { createLogger } from '../debug/create-logger';
import { LOG_LEVEL } from '../debug/levels';

export type Callback = (err: Error) => void;

const debug = createLogger(LOG_LEVEL.DEBUG, 'wait');
const notice = createLogger(LOG_LEVEL.NOTICE, 'wait');

export interface IWaiter {
	waiting?: string[];
	over(): void;
	(title: string, promise: PromiseLike<any>): void;
}

export function createWaiter(cb: Callback): IWaiter {
	let count = 0;
	let waiting: string[] = [];
	
	let t2: number;
	const t1 = setTimeout(() => {
		notice('something slow');
		t2 = setInterval(() => {
			notice('still waiting (%s/%s): [%s]', count, waiting.length, waiting.join(', '));
		}, 2000);
	}, 8000);
	
	function allComplete() {
		waiting = null;
		clearTimeout(t1);
		if (t2) {
			clearInterval(t2);
		}
	}
	
	function pop(title: string) {
		const i = waiting.indexOf(title);
		if (i !== -1) {
			waiting.splice(i, 1);
		}
	}
	
	const ret: any = (title: string, promise: Promise<void>) => {
		debug('waiting %s to finish', title);
		if (!title) {
			throw new Error('can not wait a empty thing.');
		}
		if (waiting.indexOf(title) !== -1) {
			throw new Error('wait ' + title + ' twice.');
		}
		
		count++;
		waiting.push(title);
		setImmediate(() => {
			promise.then(() => {
				count--;
				pop(title);
				debug('%s success [still %s]', title, count);
				if (count === 0) {
					debug('all finish');
					allComplete();
					cb(null);
				}
			}, (err) => {
				debug('%s fail', title);
				allComplete();
				cb(err || new Error('unknown error'));
			});
		});
	};
	
	ret.waiting = waiting;
	ret.over = () => {
		if (waiting.length === 0) {
			allComplete();
		}
	};
	
	return ret;
}
