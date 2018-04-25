export class PromiseCounter {
	protected promiseList: Promise<any>[] = [];
	
	add(p: Promise<any>) {
		this.promiseList.push(p);
		p.then(() => {
			const i = this.promiseList.indexOf(p);
			this.promiseList.splice(i, 1);
		});
	}
	
	wait() {
		return Promise.all(this.promiseList);
	}
}
