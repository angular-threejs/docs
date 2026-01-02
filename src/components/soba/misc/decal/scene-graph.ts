import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { textureResource } from 'angular-three-soba/loaders';
import { NgtsDecal } from 'angular-three-soba/misc';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Sphere with decal -->
		<ngt-mesh>
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngt-mesh-standard-material color="#444" [roughness]="0.4" [metalness]="0.1" />

			<!-- Front decal -->
			<ngts-decal [options]="{ position: [0, 0, 1], scale: 0.75 }">
				<ngt-mesh-basic-material
					[map]="texture.value()"
					transparent
					[polygonOffset]="true"
					[polygonOffsetFactor]="-10"
				/>
			</ngts-decal>

			<!-- Back decal -->
			<ngts-decal [options]="{ position: [0, 0, -1], rotation: [0, Math.PI, 0], scale: 0.75 }">
				<ngt-mesh-basic-material
					[map]="texture.value()"
					transparent
					[polygonOffset]="true"
					[polygonOffsetFactor]="-10"
				/>
			</ngts-decal>

			<!-- Side decal -->
			<ngts-decal [options]="{ position: [1, 0, 0], rotation: [0, Math.PI / 2, 0], scale: 0.5 }">
				<ngt-mesh-basic-material
					[map]="texture.value()"
					transparent
					[polygonOffset]="true"
					[polygonOffsetFactor]="-10"
				/>
			</ngts-decal>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsDecal],
})
export class SceneGraph {
	protected readonly Math = Math;

	// Using a simple data URL for a circular decal pattern
	texture = textureResource(
		() =>
			'data:image/svg+xml,' +
			encodeURIComponent(`
		<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
			<circle cx="64" cy="64" r="60" fill="#ff6b6b"/>
			<circle cx="64" cy="64" r="40" fill="#4ecdc4"/>
			<circle cx="64" cy="64" r="20" fill="#fff"/>
		</svg>
	`),
	);
}
