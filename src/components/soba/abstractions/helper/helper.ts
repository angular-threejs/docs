import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-helper',
	template: `
		<ngt-canvas [camera]="{ position: [5, 5, 5], fov: 50 }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'helper-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class Helper {
	static clientProviders = [provideNgtRenderer()];
}
