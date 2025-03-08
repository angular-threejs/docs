import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';

import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-cube-camera',
	template: `
		<ngt-canvas [camera]="{ position: [0, 5, 20] }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph, SobaWrapper],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CubeCamera {
	static clientProviders = [provideNgtRenderer()];
}
