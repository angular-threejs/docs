import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	inject,
	signal,
	viewChild,
} from '@angular/core';
import { extend, injectBeforeRender, NgtArgs, type NgtThreeElements } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { TweakpaneCheckbox, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvasContent } from 'angular-three/dom';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color *args="['#201919']" attach="background" />

		<ngt-ambient-light [intensity]="0.5" />
		<ngt-spot-light [position]="[0, 8, 4]" [intensity]="Math.PI" [decay]="0" [angle]="2" />

		<ngt-group #group>
			@for (x of positions; track $index) {
				@for (y of positions; track $index) {
					@for (z of positions; track $index) {
						<ngt-mesh
							[position]="[x, y, z]"
							(pointerenter)="stopPropagation() && $event.stopPropagation(); onPointerEnter(material)"
							(pointerleave)="stopPropagation() && $event.stopPropagation(); onPointerLeave(material)"
						>
							<ngt-box-geometry />
							<ngt-mesh-standard-material #material color="#efefef" [roughness]="0.5" [metalness]="0.5" />
						</ngt-mesh>
					}
				}
			}
		</ngt-group>

		<ngts-orbit-controls />

		<tweakpane-pane title="Stop Propagation" [container]="canvasContent.host">
			<tweakpane-checkbox [(value)]="stopPropagation" label="Enabled" />
		</tweakpane-pane>
	`,
	imports: [NgtsOrbitControls, NgtArgs, TweakpanePane, TweakpaneCheckbox],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	stopPropagation = signal(true);

	private groupRef = viewChild.required<ElementRef<THREE.Group>>('group');

	protected canvasContent = inject(NgtCanvasContent);

	protected readonly positions = [-2.5, 0, 2.5];

	constructor() {
		extend(THREE);

		injectBeforeRender(({ delta }) => {
			this.groupRef().nativeElement.rotation.y += delta * 0.25;
		});
	}

	onPointerEnter(material: NgtThreeElements['ngt-mesh-standard-material']) {
		(material as THREE.MeshStandardMaterial).color.set('mediumpurple');
	}

	onPointerLeave(material: NgtThreeElements['ngt-mesh-standard-material']) {
		(material as THREE.MeshStandardMaterial).color.set('#efefef');
	}
}
