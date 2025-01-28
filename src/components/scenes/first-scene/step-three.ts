import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { extend, NgtArgs } from "angular-three";
import * as THREE from "three";

extend(THREE);

@Component({
  selector: "app-step-three-scene-graph",
  template: `
    <ngt-mesh [position]="[0, 1, 0]">
      <ngt-box-geometry *args="[1, 2, 1]" />
      <ngt-mesh-basic-material color="mediumpurple" />
    </ngt-mesh>
  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThree {}
