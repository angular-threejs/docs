import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-depth',
	template: `
		<ngt-canvas [camera]="{ position: [0, 2, 8], fov: 50, near: 0.1, far: 30 }">
			<app-postprocessing-wrapper *canvasContent [lights]="false">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'depth-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class Depth {
	static clientProviders = [provideNgtRenderer()];
}
