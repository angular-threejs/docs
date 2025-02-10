import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { ToggleButton } from '../toggle-button';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas [camera]="{ position: [11, 11, 11], fov: 45, near: 0.1, far: 1000 }" [lookAt]="[-8, 3, -3]">
			<app-scene-graph *canvasContent [stopPropagation]="stopPropagation()" />
		</ngt-canvas>
		<button class="absolute right-4 top-0" [(toggleButton)]="stopPropagation">stopPropagation()</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pointer-events relative block !mt-0 h-full w-full' },
	imports: [NgtCanvas, SceneGraph, ToggleButton],
})
export default class EventPropagationDemo {
	static clientProviders = [provideNgtRenderer()];

	protected stopPropagation = signal(true);
}
