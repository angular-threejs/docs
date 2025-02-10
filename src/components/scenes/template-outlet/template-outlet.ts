import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'template-outlet-docs' },
})
export default class TemplateOutletDemo {
	static clientProviders = [provideNgtRenderer()];
}
