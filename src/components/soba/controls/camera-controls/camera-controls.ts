import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-camera-controls',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 5], fov: 60 }" shadows>
			<app-soba-wrapper *canvasContent [grid]="false" [controls]="null" [lights]="false">
				<app-scene-graph [host]="host" />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'camera-controls-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class CameraControls {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
}
