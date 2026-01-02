import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { depthBuffer } from 'angular-three-soba/misc';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Scene objects at different depths -->
		<ngt-mesh [position]="[-1.5, 0, 2]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngt-mesh [position]="[0, 0, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<ngt-mesh [position]="[1.5, 0, -2]">
			<ngt-cone-geometry *args="[0.5, 1, 32]" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<!-- Plane showing depth visualization -->
		<ngt-mesh [position]="[3, 0, 0]" #depthPlane>
			<ngt-plane-geometry *args="[2, 2]" />
			<ngt-shader-material
				[vertexShader]="vertexShader"
				[fragmentShader]="fragmentShader"
				[uniforms]="uniforms"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs],
})
export class SceneGraph {
	// Create depth buffer
	depth = depthBuffer(() => ({ size: 256, frames: Infinity }));

	uniforms = {
		depthTexture: { value: null as THREE.DepthTexture | null },
		cameraNear: { value: 0.1 },
		cameraFar: { value: 100 },
	};

	vertexShader = `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	fragmentShader = `
		uniform sampler2D depthTexture;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		float linearizeDepth(float depth) {
			float z = depth * 2.0 - 1.0;
			return (2.0 * cameraNear * cameraFar) / (cameraFar + cameraNear - z * (cameraFar - cameraNear));
		}

		void main() {
			float depth = texture2D(depthTexture, vUv).r;
			float linearDepth = linearizeDepth(depth) / cameraFar;
			gl_FragColor = vec4(vec3(1.0 - linearDepth), 1.0);
		}
	`;

	constructor() {
		effect(() => {
			const depthTexture = this.depth;
			if (depthTexture) {
				this.uniforms.depthTexture.value = depthTexture;
			}
		});
	}
}
