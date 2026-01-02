import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsContactShadows } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Floating sphere -->
		<ngt-mesh [position]="[0, 1, 0]">
			<ngt-sphere-geometry *args="[0.75, 32, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<!-- Floating box -->
		<ngt-mesh [position]="[-1.5, 0.6, 0.5]">
			<ngt-box-geometry *args="[0.8, 0.8, 0.8]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<!-- Floating torus -->
		<ngt-mesh [position]="[1.5, 0.8, -0.5]" [rotation]="[Math.PI / 4, 0, 0]">
			<ngt-torus-geometry *args="[0.4, 0.15, 16, 32]" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<!-- Contact shadows - renders shadows on a plane -->
		<ngts-contact-shadows
			[options]="{
				position: [0, 0, 0],
				opacity: 0.6,
				scale: 10,
				blur: 2.5,
				far: 4,
				resolution: 512,
				color: '#000000',
			}"
		/>

		<!-- Ground plane for reference (slightly below shadows) -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, -0.01, 0]">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngt-mesh-standard-material color="#f5f5f5" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsContactShadows],
})
export class SceneGraph {
	protected readonly Math = Math;
}
