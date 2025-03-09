import { DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	effect,
	inject,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { generateWord } from '@soba/random-words.ts';
import { injectBeforeRender, NgtArgs, type NgtVector3 } from 'angular-three';
import { NgtsBillboard, NgtsText } from 'angular-three-soba/abstractions';
import { NgtsTrackballControls } from 'angular-three-soba/controls';
import * as THREE from 'three';

/**
 * Credits: https://codesandbox.io/p/sandbox/yup2o
 */

@Component({
	selector: 'app-word',
	template: `
		<ngts-billboard [options]="{ position: position() }">
			<ngts-text
				[text]="text()"
				[options]="{ fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material.toneMapped': false }"
				(pointerover)="$event.stopPropagation(); hovered.set(true)"
				(pointerout)="hovered.set(false)"
			/>
		</ngts-billboard>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsBillboard, NgtsText],
})
export class Word {
	position = input<NgtVector3>([0, 0, 0]);
	text = input.required<string>();

	private textRef = viewChild.required(NgtsText);

	private document = inject(DOCUMENT);

	protected hovered = signal(false);

	constructor() {
		effect((onCleanup) => {
			const hovered = this.hovered();
			if (hovered) this.document.body.style.cursor = 'pointer';
			onCleanup(() => (this.document.body.style.cursor = 'auto'));
		});

		const color = new THREE.Color();
		injectBeforeRender(() => {
			const textObject = this.textRef().troikaMesh;
			textObject.material.color.lerp(color.set(this.hovered() ? 'mediumpurple' : 'white'), 0.1);
		});
	}
}

@Component({
	selector: 'app-cloud',
	template: `
		@for (word of words(); track $index) {
			<app-word [position]="word.position" [text]="word.text" />
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Word],
})
export class Cloud {
	count = input(4);
	radius = input(20);

	protected words = computed(() => {
		const [count, radius] = [this.count(), this.radius()];

		const words: { position: NgtVector3; text: string }[] = [];
		const spherical = new THREE.Spherical();
		const phiSpan = Math.PI / (count + 1);
		const thetaSpan = (Math.PI * 2) / count;
		for (let i = 1; i < count + 1; i++) {
			for (let j = 0; j < count; j++) {
				words.push({
					position: new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)),
					text: generateWord(),
				});
			}
		}
		return words;
	});
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-fog *args="['#202025', 0, 80]" attach="fog" />

		<ngt-group [rotation]="[10, 10.5, 10]">
			<app-cloud [count]="count()" [radius]="radius()" />
		</ngt-group>

		<ngts-trackball-controls />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsTrackballControls, Cloud],
})
export class SceneGraph {
	count = input(8);
	radius = input(20);
}
