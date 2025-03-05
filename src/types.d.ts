declare module '*.glb' {
	const value: string;
	export default value;
}

declare module '*.CUBE' {
	const value: string;
	export default value;
}

declare module '*?includeContent' {
	import type { Type } from '@angular/core';
	const component: Type<any>;
	export const content: string;
	export const sceneGraphContent: string | undefined;
	export default component;
}
