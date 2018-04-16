import { isomorphicGlobal } from '../environment';

export function hideGlobal(varName: string|symbol, newValue: any) {
	const old = isomorphicGlobal[varName];
	delete isomorphicGlobal[varName];
	isomorphicGlobal[varName] = newValue;
	return () => {
		delete isomorphicGlobal[varName];
		if (old !== undefined) {
			isomorphicGlobal[varName] = isomorphicGlobal;
		}
	};
}
