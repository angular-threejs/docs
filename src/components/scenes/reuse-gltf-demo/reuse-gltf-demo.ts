import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtHexify } from 'angular-three';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas shadows [camera]="{ position: [5, 0, 5], fov: 35 }">
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SceneGraph, NgtHexify],
	host: { class: 'reuse-gltf-demo block relative h-full !mt-0' },
})
export default class ReuseGLTFDemo {
	static clientProviders = [provideNgtRenderer()];
}
