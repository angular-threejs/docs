import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-depth-of-field',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 6], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent [lights]="true" [controls]="null">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'depth-of-field-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class DepthOfField {
	static clientProviders = [provideNgtRenderer()];
}
