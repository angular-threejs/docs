import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-text-3d',
	template: `
		<ngt-canvas orthographic [camera]="{ position: [0, 0, 100], zoom: 100 }">
			<app-soba-wrapper *canvasContent [controls]="null" [lights]="false">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SceneGraph, SobaWrapper],
})
export default class Text3D {
	static clientProviders = [provideNgtRenderer()];
}
