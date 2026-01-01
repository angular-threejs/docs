import '@angular/compiler';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-gltf-demo-home',
	template: `
		<ngt-canvas [camera]="{ fov: 75, position: [0, 2, 3] }">
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GLTFDemoHome {
	static clientProviders = [provideNgtRenderer()];
}
