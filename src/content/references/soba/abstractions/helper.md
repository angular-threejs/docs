---
arguments:
    - name: target
      type: '() => ElementRef<Object3D> | Object3D'
      description: >-
          Signal containing the target object to attach the helper to.
      required: true
    - name: helperType
      type: '() => Type<Helper>'
      description: >-
          Signal containing the helper constructor type (e.g., BoxHelper, PointLightHelper).
      required: true
    - name: options
      type: 'Partial<NgtsHelperOptions<Helper>>'
      description: >-
          Configuration options for the helper.
      required: false
returns:
    - type: Signal<Helper | null>
      description: >-
          Signal containing the helper instance, or null if not yet created.
---

`helper` is a function to add helpers to existing nodes in the scene. It handles removal of the helper on destroy and auto-updates it by default.

:::caution

`injectHelper` is deprecated. Use `helper` instead.

:::

### Usage

```angular-ts
import { helper } from 'angular-three-soba/abstractions';
import { BoxHelper, PointLightHelper } from 'three';
```

```angular-ts
@Component({
    selector: 'app-scene',
    template: `
        <ngt-mesh #mesh>
            <ngt-box-geometry />
            <ngt-mesh-standard-material />
        </ngt-mesh>
    `,
})
export class Scene {
    mesh = viewChild.required<ElementRef<Mesh>>('mesh');

    boxHelper = helper(this.mesh, () => BoxHelper, {
        args: () => ['cyan'],
    });
}
```

### Options

| Property | Type                                  | Description                                            | Default |
| -------- | ------------------------------------- | ------------------------------------------------------ | ------- |
| `args`   | `() => ConstructorParameters<Helper>` | Signal of constructor arguments to pass to the helper. | `[]`    |
| `update` | `boolean`                             | Whether to automatically update the helper each frame. | `true`  |

### With PointLightHelper

```angular-ts
@Component({
    selector: 'app-scene',
    template: `
        <ngt-point-light #light [position]="[5, 5, 5]" />
    `,
})
export class Scene {
    light = viewChild.required<ElementRef<PointLight>>('light');

    lightHelper = helper(this.light, () => PointLightHelper, {
        args: () => [1, 'yellow'],
    });
}
```

### With DirectionalLightHelper

```angular-ts
@Component({
    selector: 'app-scene',
    template: `
        <ngt-directional-light #light [position]="[10, 10, 10]" />
    `,
})
export class Scene {
    light = viewChild.required<ElementRef<DirectionalLight>>('light');

    lightHelper = helper(this.light, () => DirectionalLightHelper, {
        args: () => [5, 'red'],
    });
}
```

### Disabling Auto-Update

If you don't need the helper to update every frame, set `update: false`:

```angular-ts
boxHelper = helper(this.mesh, () => BoxHelper, {
    args: () => ['cyan'],
    update: false,
});
```

---

## NgtsHelper

A declarative way to add helpers to existing nodes in the scene. It handles removal of the helper on destroy and auto-updates it by default.

### Usage

```angular-ts
import { NgtsHelper } from 'angular-three-soba/abstractions';
import { BoxHelper } from 'three';
```

```angular-html
<ngt-mesh>
    <ngt-box-geometry />
    <ngt-mesh-standard-material />
    <ngts-helper [type]="BoxHelper" [options]="['cyan']" />
</ngt-mesh>
```

### Inputs

| Input     | Type                            | Description                                  | Required |
| --------- | ------------------------------- | -------------------------------------------- | -------- |
| `type`    | `Type<Helper>`                  | The helper constructor type.                 | Yes      |
| `options` | `ConstructorParameters<Helper>` | Constructor arguments to pass to the helper. | No       |

### With PointLightHelper

```angular-html
<ngt-point-light [position]="[5, 5, 5]">
    <ngts-helper [type]="PointLightHelper" [options]="[1, 'yellow']" />
</ngt-point-light>
```

### With CameraHelper

```angular-html
<ngt-perspective-camera [position]="[0, 5, 10]" #camera>
    <ngts-helper [type]="CameraHelper" />
</ngt-perspective-camera>
```
