import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';
import { start } from './start';

@Component({
	selector: 'rapier-demo',
	template: `
		<ngt-canvas [camera]="{ position: [-1, 5, 5], fov: 45 }" shadows>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
		<button class="absolute m-0 cursor-pointer" [class.hidden]="start()" (click)="start.set(true)">Start</button>
	`,
	host: {
		class: 'flex items-center justify-center h-full',
	},
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RapierDemo {
	static clientProviders = [provideNgtRenderer()];
	protected readonly start = start;
}
