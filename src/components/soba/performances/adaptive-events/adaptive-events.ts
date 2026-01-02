import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-adaptive-events',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 5], fov: 50 }" [performance]="{ min: 0.2 }">
			<app-soba-wrapper *canvasContent [controls]="null">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'adaptive-events-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class AdaptiveEvents {
	static clientProviders = [provideNgtRenderer()];
}
