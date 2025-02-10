```angular-ts
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgtCanvas } from "angular-three/dom";
import { SceneGraph } from "./scene-graph";

@Component({
    template: `
        <ngt-canvas>
            <app-scene-graph *canvasContent />
        </ngt-canvas>

        <span class="font-mono absolute bottom-0 right-0 text-sm">
            * click/hover the cube
        </span>
    `,
    host: {
        class: "relative flex h-full",
    },
    imports: [NgtCanvas, SceneGraph],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PointerDemo {}
```
