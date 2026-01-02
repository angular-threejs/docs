import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsPointerLockControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Floor -->
		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, 0, 0]">
			<ngt-plane-geometry *args="[20, 20]" />
			<ngt-mesh-standard-material color="#444" />
		</ngt-mesh>

		<!-- Some objects to look at -->
		<ngt-mesh [position]="[-3, 1, -3]">
			<ngt-box-geometry *args="[1, 2, 1]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<ngt-mesh [position]="[3, 0.5, -5]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<ngt-mesh [position]="[0, 0.75, -8]">
			<ngt-cone-geometry *args="[0.75, 1.5, 32]" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<ngt-mesh [position]="[5, 1, -2]">
			<ngt-torus-geometry *args="[0.5, 0.2, 16, 32]" />
			<ngt-mesh-standard-material color="#ffeaa7" />
		</ngt-mesh>

		<!-- Pointer lock controls -->
		<ngts-pointer-lock-controls (lock)="onLock()" (unlock)="onUnlock()" />

		<!-- UI overlay -->
		@if (!isLocked()) {
			<ngt-group>
				<!-- This is just for visual reference - actual UI would be HTML overlay -->
			</ngt-group>
		}
	`,
	styles: `
		:host {
			position: relative;
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsPointerLockControls],
})
export class SceneGraph {
	protected readonly Math = Math;
	isLocked = signal(false);

	onLock() {
		this.isLocked.set(true);
	}

	onUnlock() {
		this.isLocked.set(false);
	}
}
