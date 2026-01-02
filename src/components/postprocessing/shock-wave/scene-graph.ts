import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	viewChild,
} from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpShockWave } from 'angular-three-postprocessing';
import { EffectPass, ShockWaveEffect } from 'postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Click the sphere to trigger shock wave -->
		<ngt-mesh #sphere (click)="triggerShockwave()" [position]="[0, 0, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#f97316" [emissive]="'#f97316'" [emissiveIntensity]="0.3" />
		</ngt-mesh>

		<!-- Background objects to show distortion -->
		<ngt-mesh [position]="[-2, 1, -2]">
			<ngt-box-geometry *args="[0.8, 0.8, 0.8]" />
			<ngt-mesh-standard-material color="#3b82f6" />
		</ngt-mesh>

		<ngt-mesh [position]="[2, -0.5, -1]">
			<ngt-torus-geometry *args="[0.4, 0.15, 16, 32]" />
			<ngt-mesh-standard-material color="#22c55e" />
		</ngt-mesh>

		<ngt-mesh [position]="[-1.5, -1, -1.5]">
			<ngt-dodecahedron-geometry *args="[0.5, 0]" />
			<ngt-mesh-standard-material color="#a855f7" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.5, 1.2, -2]">
			<ngt-octahedron-geometry *args="[0.4, 0]" />
			<ngt-mesh-standard-material color="#ec4899" />
		</ngt-mesh>

		<!-- Grid background -->
		<ngt-grid-helper *args="[20, 20, '#333', '#333']" [position]="[0, -2, 0]" />

		<ngtp-effect-composer>
			<ngtp-shock-wave
				#shockwave
				[options]="{
					speed: 1.5,
					maxRadius: 3,
					waveSize: 0.4,
					amplitude: 0.1,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpShockWave],
})
export class SceneGraph {
	private sphereRef = viewChild.required<ElementRef<THREE.Mesh>>('sphere');
	private shockwaveRef = viewChild(NgtpShockWave);
	private effectComposer = viewChild.required(NgtpEffectComposer);

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const sphere = this.sphereRef().nativeElement;
			// Gentle floating animation
			sphere.position.y = Math.sin(t * 1.5) * 0.1;
			sphere.rotation.y = t * 0.5;
		});

		// Auto-trigger shockwave every 3 seconds for demo purposes
		afterNextRender(() => {
			// Initial trigger after a short delay
			setTimeout(() => this.triggerShockwave(), 500);
			// Then repeat every 3 seconds
			setInterval(() => this.triggerShockwave(), 3000);
		});
	}

	triggerShockwave() {
		const composer = this.effectComposer().effectComposer();

		const effectPass = composer.passes.find((pass): pass is EffectPass => pass instanceof EffectPass);
		if (!effectPass) return;

		const shockWaveEffect = effectPass['effects'].find(
			(effect): effect is ShockWaveEffect => effect instanceof ShockWaveEffect,
		);
		if (!shockWaveEffect) return;

		shockWaveEffect.explode();
	}
}
