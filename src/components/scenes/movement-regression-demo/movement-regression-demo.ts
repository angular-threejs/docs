import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas
			shadows
			[performance]="{ min: 0.1 }"
			[gl]="{ antialias: false }"
			[camera]="{ position: [0, 0, 0.8], fov: 75, near: 0.5, far: 1 }"
		>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SceneGraph],
	host: { class: 'movement-regression-demo relative block h-full' },
})
export default class MovementRegressionDemo {
	static clientProviders = [provideNgtRenderer()];
}
