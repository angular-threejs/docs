import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-cube-camera',
	template: `
		<ngt-canvas [camera]="{ position: [0, 10, 40] }">
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CubeCamera {
	static clientProviders = [provideNgtRenderer()];
}
