import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-cloud',
	template: `
		<ngt-canvas [camera]="{ position: [0, 5, 10], fov: 50 }">
			<app-soba-wrapper *canvasContent [grid]="false" background="#87ceeb">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'cloud-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class Cloud {
	static clientProviders = [provideNgtRenderer()];
}
