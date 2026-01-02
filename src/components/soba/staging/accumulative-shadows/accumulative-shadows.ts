import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-accumulative-shadows',
	template: `
		<ngt-canvas shadows [camera]="{ position: [4, 4, 4], fov: 50 }">
			<app-soba-wrapper *canvasContent [grid]="false" [lights]="false">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'accumulative-shadows-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class AccumulativeShadows {
	static clientProviders = [provideNgtRenderer()];
}
