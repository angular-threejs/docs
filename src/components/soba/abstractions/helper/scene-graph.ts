import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsHelper } from 'angular-three-soba/abstractions';
import { BoxHelper, DirectionalLightHelper, PointLightHelper } from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Mesh with BoxHelper -->
		<ngt-mesh [position]="[-2, 0.5, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
			<ngts-helper [type]="BoxHelper" [options]="['cyan']" />
		</ngt-mesh>

		<!-- Sphere with BoxHelper -->
		<ngt-mesh [position]="[0, 0.5, 0]">
			<ngt-sphere-geometry *args="[0.6, 32, 32]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
			<ngts-helper [type]="BoxHelper" [options]="['yellow']" />
		</ngt-mesh>

		<!-- Torus with BoxHelper -->
		<ngt-mesh [position]="[2, 0.5, 0]">
			<ngt-torus-geometry *args="[0.5, 0.2, 16, 32]" />
			<ngt-mesh-standard-material color="#a29bfe" />
			<ngts-helper [type]="BoxHelper" [options]="['magenta']" />
		</ngt-mesh>

		<!-- Directional light with helper -->
		<ngt-directional-light [position]="[5, 5, 5]" [intensity]="Math.PI">
			<ngts-helper [type]="DirectionalLightHelper" [options]="[1, '#ffff00']" />
		</ngt-directional-light>

		<!-- Point light with helper -->
		<ngt-point-light [position]="[-3, 3, 0]" [intensity]="Math.PI * 2" color="#ff8800">
			<ngts-helper [type]="PointLightHelper" [options]="[0.5, '#ff8800']" />
		</ngt-point-light>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsHelper],
})
export class SceneGraph {
	protected readonly Math = Math;
	protected readonly BoxHelper = BoxHelper;
	protected readonly DirectionalLightHelper = DirectionalLightHelper;
	protected readonly PointLightHelper = PointLightHelper;
}
