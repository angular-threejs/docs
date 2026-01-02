import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsGizmoHelper, NgtsGizmoViewcube } from 'angular-three-soba/gizmos';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-normal-material />
		</ngt-mesh>

		<ngts-gizmo-helper [options]="{ alignment: 'bottom-right', margin: [80, 80] }">
			<ngts-gizmo-viewcube *gizmoHelperContent />
		</ngts-gizmo-helper>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsGizmoHelper, NgtsGizmoViewcube],
})
export class SceneGraph {}
