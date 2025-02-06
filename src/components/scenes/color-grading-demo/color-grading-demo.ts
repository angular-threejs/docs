import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
} from "@angular/core";
import {
  NgtCanvas,
  NgtCanvasContent,
  provideNgtRenderer,
} from "angular-three/dom";
import { NgtsStats } from "angular-three-soba/stats";
import { SceneGraph } from "./scene-graph";
import { ToggleButton } from "../toggle-button";

@Component({
  template: `
    <ngt-canvas
      [stats]="{ parent: host, domClass: 'stats' }"
      [frameloop]="frameloop()"
      [camera]="{ position: [0, 0, 3], fov: 45 }"
    >
      <app-scene-graph *canvasContent />
    </ngt-canvas>
    <button [(toggleButton)]="onDemand" class="absolute top-4 right-4">
      on-demand renderering
    </button>
  `,
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph, NgtsStats, ToggleButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "color-grading-demo relative block h-full !mt-0" },
  styles: `
    :host {
      & .stats {
        position: static !important;

        & canvas {
          margin-top: 0 !important;
        }
      }
    }
  `,
})
export default class ColorGradingDemo {
  static clientProviders = [provideNgtRenderer()];

  protected host = inject(ElementRef);
  protected onDemand = signal(true);
  protected frameloop = computed(() => (this.onDemand() ? "demand" : "always"));
}
