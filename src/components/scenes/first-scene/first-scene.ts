import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { StepEight } from './step-eight';
import { StepFive } from './step-five';
import { StepNine } from './step-nine';
import { StepOne } from './step-one';
import { StepSeven } from './step-seven';
import { StepSix } from './step-six';
import { StepThree } from './step-three';
import { StepTwo } from './step-two';

@Component({
	template: `
		<ngt-canvas [shadows]="shadows()" [camera]="cameraOptions()" [lookAt]="lookAt()">
			<ng-template canvasContent>
				@let _step = step();

				@if (_step === 1) {
					<app-step-one-scene-graph />
				} @else if (_step === 2) {
					<app-step-two-scene-graph />
				} @else if (_step === 3 || _step === 4) {
					<app-step-three-scene-graph />
				} @else if (_step === 5) {
					<app-step-five-scene-graph />
				} @else if (_step === 6) {
					<app-step-six-scene-graph />
				} @else if (_step === 7) {
					<app-step-seven-scene-graph />
				} @else if (_step === 8) {
					<app-step-eight-scene-graph />
				} @else if (_step === 9) {
					<app-step-nine-scene-graph />
				}
			</ng-template>
		</ngt-canvas>
	`,
	imports: [NgtCanvas, StepOne, StepTwo, StepThree, StepFive, StepSix, StepSeven, StepEight, StepNine],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FirstScene {
	static clientProviders = [provideNgtRenderer()];

	step = input.required<number>();

	protected cameraOptions = computed(() => {
		const step = this.step();
		if (step >= 4) return { position: [5, 5, 5] };
		return {};
	});
	protected lookAt = computed(() => {
		const step = this.step();
		if (step >= 4) return [0, 1, 0];
		return undefined;
	});
	protected shadows = computed(() => this.step() >= 9);
}
