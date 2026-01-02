import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-n8ao',
	template: `
		<ngt-canvas [camera]="{ position: [4, 4, 4], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent [lights]="true" [grid]="false">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'n8ao-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class N8AO {
	static clientProviders = [provideNgtRenderer()];
}
