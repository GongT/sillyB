declare const window: any;
declare const process: any;
declare const global: any;

export const IS_BROWSER = typeof window === 'object';
export const IS_NODE = typeof process === 'object';
/** @deprecated */
export const IS_SERVER = IS_NODE;

export const isomorphicGlobal = IS_BROWSER? window : global;
