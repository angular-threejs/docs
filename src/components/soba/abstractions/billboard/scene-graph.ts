import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { NgtsBillboard, NgtsText } from 'angular-three-soba/abstractions';
import { NgtsOrbitControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-billboard
			[options]="{ follow: follow(), lockZ: lockZ(), lockY: lockY(), lockX: lockX(), position: [0.5, 2.05, 0.5] }"
		>
			<ngts-text
				text="hello"
				[options]="{ fontSize: 1, outlineWidth: '5%', outlineColor: '#000000', outlineOpacity: 1 }"
			/>
		</ngts-billboard>
		<ngt-mesh [position]="[0.5, 1, 0.5]">
			<ngt-box-geometry />
			<ngt-mesh-standard-material color="red" />
		</ngt-mesh>
		<ngt-group [position]="[-2.5, -3, -1]">
			<ngts-billboard
				[options]="{ follow: follow(), lockZ: lockZ(), lockY: lockY(), lockX: lockX(), position: [0, 1.05, 0] }"
			>
				<ngts-text
					text="cone"
					[options]="{ fontSize: 1, outlineWidth: '5%', outlineColor: '#000000', outlineOpacity: 1 }"
				/>
			</ngts-billboard>
			<ngt-mesh>
				<ngt-cone-geometry />
				<ngt-mesh-standard-material color="green" />
			</ngt-mesh>
		</ngt-group>

		<ngts-billboard
			[options]="{ follow: follow(), lockZ: lockZ(), lockY: lockY(), lockX: lockX(), position: [0, 0, -5] }"
		>
			<ngt-mesh>
				<ngt-plane-geometry />
				<ngt-mesh-standard-material color="#000066" />
			</ngt-mesh>
		</ngts-billboard>

		<ngts-orbit-controls [options]="{ enablePan: false, zoomSpeed: 0.5 }" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [NgtsBillboard, NgtsText, NgtsOrbitControls],
})
export class SceneGraph {
	follow = input(true);
	lockX = input(false);
	lockY = input(false);
	lockZ = input(false);
}
