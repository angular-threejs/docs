import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas [camera]="{ position: [25, 25, 25], fov: 60, near: 0.1, far: 100 }">
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SceneGraph],
	host: { class: 'instance-scatter-demo' },
})
export default class InstanceScatterDemo {
	static clientProviders = [provideNgtRenderer()];
}
