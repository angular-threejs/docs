import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-god-rays',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 8], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent [lights]="false" background="#0a0a1a">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'god-rays-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class GodRays {
	static clientProviders = [provideNgtRenderer()];
}
