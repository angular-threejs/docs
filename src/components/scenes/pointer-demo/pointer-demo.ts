import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas>
			<app-scene-graph *canvasContent />
		</ngt-canvas>

		<span class="absolute bottom-0 right-0 font-mono text-sm">* click/hover the cube</span>
	`,
	host: {
		class: 'relative flex h-full !mt-0',
	},
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PointerDemo {
	static clientProviders = [provideNgtRenderer()];
}
