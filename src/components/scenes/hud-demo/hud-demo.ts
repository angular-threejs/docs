import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
		<span class="absolute bottom-4 right-4 font-mono text-xs">* click/hover the cube</span>
	`,
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'hud-demo-docs block h-full relative !mt-0' },
})
export default class HudDemo {
	static clientProviders = [provideNgtRenderer()];
}
