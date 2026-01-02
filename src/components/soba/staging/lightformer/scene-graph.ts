import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsEnvironment, NgtsLightformer } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngt-mesh-standard-material [metalness]="1" [roughness]="0" color="white" />
		</ngt-mesh>

		<ngts-environment [options]="{ background: true }">
			<ng-template>
				<ngt-color *args="['#111']" attach="background" />

				<!-- Ring lightformer behind -->
				<ngts-lightformer
					[options]="{
						position: [0, 0, -5],
						scale: 10,
						intensity: 4,
						form: 'ring',
						color: '#ff4040',
					}"
				/>

				<!-- Rectangle lightformers on sides -->
				<ngts-lightformer
					[options]="{
						position: [5, 0, 0],
						rotation: [0, Math.PI / 2, 0],
						scale: [5, 3, 1],
						intensity: 2,
						form: 'rect',
						color: '#4080ff',
					}"
				/>
				<ngts-lightformer
					[options]="{
						position: [-5, 0, 0],
						rotation: [0, -Math.PI / 2, 0],
						scale: [5, 3, 1],
						intensity: 2,
						form: 'rect',
						color: '#40ff80',
					}"
				/>

				<!-- Circle lightformer above -->
				<ngts-lightformer
					[options]="{
						position: [0, 5, 0],
						rotation: [Math.PI / 2, 0, 0],
						scale: 3,
						intensity: 3,
						form: 'circle',
						color: 'white',
					}"
				/>
			</ng-template>
		</ngts-environment>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsEnvironment, NgtsLightformer],
})
export class SceneGraph {
	protected readonly Math = Math;
}
