import { Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph],
})
export default class SimpleTestingScene {
	static clientProviders = [provideNgtRenderer()];
}
