import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-pointer-lock-controls',
	template: `
		<ngt-canvas [camera]="{ position: [0, 1, 5], fov: 75 }">
			<app-soba-wrapper *canvasContent [controls]="null" [grid]="false">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pointer-lock-controls-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class PointerLockControls {
	static clientProviders = [provideNgtRenderer()];
}
