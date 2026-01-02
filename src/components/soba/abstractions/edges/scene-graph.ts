import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsEdges } from 'angular-three-soba/abstractions';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
			<ngts-edges [options]="{ threshold: 15, color: '#222', lineWidth: 2 }" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsEdges],
})
export class SceneGraph {}
