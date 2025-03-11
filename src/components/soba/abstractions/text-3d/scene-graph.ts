import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { injectStore } from 'angular-three';
import { NgtsText3D } from 'angular-three-soba/abstractions';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsCenter } from 'angular-three-soba/staging';

import interBoldJson from '@common-assets/inter_bold.json';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light [intensity]="Math.PI * 0.5" />
		<ngt-directional-light [intensity]="Math.PI" [position]="10" />

		<ngts-center
			[options]="{
				bottom: true,
				right: true,
				position: [-viewportWidth() / 2 + 0.5, viewportHeight() / 2 - 0.5, 0],
			}"
		>
			<ngts-text-3d text="top left" [font]="interBoldJson" [options]="{ letterSpacing: -0.06, size: 0.5 }">
				<ngt-mesh-standard-material />
			</ngts-text-3d>
		</ngts-center>

		<ngts-center
			[options]="{
				top: true,
				left: true,
				position: [viewportWidth() / 2 - 0.5, -viewportHeight() / 2 + 0.5, 0],
			}"
		>
			<ngts-text-3d text="bottom right" [font]="interBoldJson" [options]="{ letterSpacing: -0.06, size: 0.5 }">
				<ngt-mesh-standard-material />
			</ngts-text-3d>
		</ngts-center>

		<ngts-center [options]="{ rotation: [-0.5, -0.25, 0] }">
			<ngts-text-3d
				text="angular"
				[font]="interBoldJson"
				[options]="{
					curveSegments: 32,
					bevelEnabled: true,
					bevelSize: 0.04,
					bevelThickness: 0.1,
					height: 0.5,
					lineHeight: 0.5,
					letterSpacing: -0.06,
					size: 1.5,
				}"
			>
				<ngt-mesh-normal-material />
			</ngts-text-3d>
		</ngts-center>

		<ngt-axes-helper [scale]="2" />
		<ngts-orbit-controls
			[options]="{ enableZoom: false, minPolarAngle: Math.PI / 2, maxPolarAngle: Math.PI / 2 }"
		/>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsOrbitControls, NgtsCenter, NgtsText3D],
})
export class SceneGraph {
	protected readonly Math = Math;
	protected readonly interBoldJson = interBoldJson;

	private store = injectStore();
	protected viewportWidth = this.store.viewport.width;
	protected viewportHeight = this.store.viewport.height;
}
