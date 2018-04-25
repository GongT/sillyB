import { TypedConfig } from './type-config';

export interface WellKnownConfig {
	IsDebugMode: boolean;
}

export function setDefaults(config: TypedConfig<WellKnownConfig>) {
	config.setDefault('IsDebugMode', true);
}
