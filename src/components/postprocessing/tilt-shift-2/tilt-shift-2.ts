import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-tilt-shift-2',
	template: `
		<ngt-canvas [camera]="{ position: [5, 5, 5], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent>
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'tilt-shift-2-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class TiltShift2 {
	static clientProviders = [provideNgtRenderer()];
}
