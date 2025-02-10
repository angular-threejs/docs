import { Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 2] }">
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph],
})
export default class SimpleScene {
	static clientProviders = [provideNgtRenderer()];
}
