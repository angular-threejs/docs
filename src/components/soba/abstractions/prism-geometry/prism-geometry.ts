import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-prism-geometry',
	template: `
		<ngt-canvas [camera]="{ position: [3, 3, 3], fov: 50 }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'prism-geometry-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class PrismGeometry {
	static clientProviders = [provideNgtRenderer()];
}
