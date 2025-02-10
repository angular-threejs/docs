```angular-ts
import { NgtCanvas } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
    template: `
        <ngt-canvas>
            <app-scene-graph *canvasContent />
        </ngt-canvas>
    `,
    imports: [NgtCanvas, SceneGraph]
})
export class SimpleScene {}
```
