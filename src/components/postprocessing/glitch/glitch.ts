import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-glitch',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 5], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent [lights]="true">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'glitch-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class Glitch {
	static clientProviders = [provideNgtRenderer()];
}
