import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'rapier-demo',
	template: `
		<ngt-canvas [camera]="{ position: [-1, 5, 5], fov: 45 }" shadows>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	host: {
		class: 'flex items-center justify-center h-full',
	},
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RapierDemo {
	static clientProviders = [provideNgtRenderer()];
}
