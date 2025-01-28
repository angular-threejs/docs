```angular-ts
import { NgtCanvas, NgtCanvasContent } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
    template: `
        <ngt-canvas>
            <app-scene-graph *canvasContent />
        </ngt-canvas>
    `,
    imports: [NgtCanvas, NgtCanvasContent, SceneGraph]
})
export class SimpleScene {}
```
