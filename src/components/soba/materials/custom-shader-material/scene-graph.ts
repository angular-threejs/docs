import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsCustomShaderMaterial } from 'angular-three-soba/materials';
import { MeshStandardMaterial } from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngts-custom-shader-material
				[baseMaterial]="MeshStandardMaterial"
				[options]="{
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					uniforms: uniforms,
					metalness: 0.5,
					roughness: 0.3,
				}"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsCustomShaderMaterial],
})
export class SceneGraph {
	protected readonly MeshStandardMaterial = MeshStandardMaterial;

	private materialRef = viewChild(NgtsCustomShaderMaterial);

	uniforms = {
		uTime: { value: 0 },
		uAmplitude: { value: 0.2 },
		uFrequency: { value: 3.0 },
	};

	vertexShader = /* glsl */ `
		uniform float uTime;
		uniform float uAmplitude;
		uniform float uFrequency;

		varying vec3 vNormal;

		void main() {
			vNormal = normal;

			// Wave displacement
			float displacement = sin(position.x * uFrequency + uTime) *
			                     sin(position.y * uFrequency + uTime) *
			                     sin(position.z * uFrequency + uTime) * uAmplitude;

			vec3 newPosition = position + normal * displacement;
			csm_Position = newPosition;
		}
	`;

	fragmentShader = /* glsl */ `
		uniform float uTime;
		varying vec3 vNormal;

		void main() {
			// Color based on normal and time
			vec3 color = 0.5 + 0.5 * cos(uTime + vNormal.xyx + vec3(0, 2, 4));
			csm_DiffuseColor = vec4(color, 1.0);
		}
	`;

	constructor() {
		beforeRender(({ clock }) => {
			const material = this.materialRef()?.material();
			if (material) {
				material.uniforms['uTime'].value = clock.elapsedTime;
			}
		});
	}
}
