import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-spot-light',
	template: `
		<ngt-canvas [camera]="{ position: [5, 3, 5], fov: 50 }">
			<app-soba-wrapper *canvasContent [grid]="false" [lights]="false">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'spot-light-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class SpotLight {
	static clientProviders = [provideNgtRenderer()];
}
