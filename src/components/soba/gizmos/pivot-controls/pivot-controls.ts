import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-pivot-controls',
	template: `
		<ngt-canvas [camera]="{ position: [3, 3, 3], fov: 50 }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pivot-controls-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class PivotControls {
	static clientProviders = [provideNgtRenderer()];
}
