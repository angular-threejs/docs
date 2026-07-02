---
inputs:
    - name: map
      type: 'NgtsKeyboardControlsEntry[]'
      description: >-
          The keyboard map defining named actions and their keys. A model() input aliased to the selector: [keyboardControls]="controlsMap". hostDirectives consumers set it programmatically via inject(NgtsKeyboardControls).map.set(controlsMap).
      required: true
    - name: domElement
      type: HTMLElement | Window
      description: >-
          The event source to attach keydown/keyup listeners to. Default: window
    - name: preventDefault
      type: boolean
      description: >-
          Whether to register non-passive listeners and call preventDefault() for mapped keys (e.g. stop Space scrolling the page). Default: false
outputs:
    - name: keyChange
      type: NgtsKeyboardControlsChangeEvent
      description: >-
          Emits { name, pressed, state } on action transitions only. Auto-repeat is deduplicated and held keys are reference-counted per action.
---

`NgtsKeyboardControls` is a renderless attribute directive (bare selector `[keyboardControls]`) ported from [Drei's KeyboardControls](https://drei.docs.pmnd.rs/controls/keyboard-controls). It attaches `keydown`/`keyup` listeners to `window` (or a custom `domElement`) and distributes the pressed state of named actions to descendants via DI. It owns no gameplay semantics — consumers decide what actions do.

### Types

#### `NgtsKeyboardControlsEntry<TName extends string>`

```angular-ts
interface NgtsKeyboardControlsEntry<TName extends string = string> {
	name: TName;
	keys: string[];
	up?: boolean;
	toggle?: boolean;
}
```

Multiple keys map to one action, matched against `event.key` or `event.code`. Prefer `event.code` values like `'KeyW'` or `'Space'` — `event.key` is layout/case-sensitive.

An entry supports three modes:

- **default** — the action is pressed while held: state is `true` while any mapped key is down.
- **`up: false`** — fire-on-press (discrete action): state latches `true` after the first press; only `keyChange` fires on subsequent press edges. Consume via `keyChange` edges. Ignored when `toggle` is `true`.
- **`toggle: true`** (default `false`) — stateful on/off: each press edge flips the state between `true` and `false`; keyup is ignored. Takes precedence over `up`. Auto-repeat does not re-flip (held keys are reference-counted). Consume via the reactive `select()` signal — e.g. `torchOn = controls.select('torch')` flips on each press of the key.

#### `NgtsKeyboardControlsState<TName>`

```angular-ts
type NgtsKeyboardControlsState<TName extends string = string> = {
	[K in TName]: boolean;
};
```

#### `NgtsKeyboardControlsChangeEvent<TName>`

```angular-ts
interface NgtsKeyboardControlsChangeEvent<TName extends string = string> {
	name: TName;
	pressed: boolean;
	state: NgtsKeyboardControlsState<TName>;
}
```

### Usage

Define the keyboard map at module level with `createKeyboardControls` — an identity factory that infers action names as literal types and returns `{ controlsMap, injectKeyboardControls }` pre-typed so consumers never repeat the generic.

```angular-ts
import { createKeyboardControls, NgtsKeyboardControls } from 'angular-three-soba/controls';

export const { controlsMap, injectKeyboardControls } = createKeyboardControls([
	{ name: 'forward', keys: ['ArrowUp', 'KeyW'] },
	{ name: 'back', keys: ['ArrowDown', 'KeyS'] },
	{ name: 'left', keys: ['ArrowLeft', 'KeyA'] },
	{ name: 'right', keys: ['ArrowRight', 'KeyD'] },
	{ name: 'jump', keys: ['Space'], up: false },
]);
```

Provide the directive via template:

```angular-html
<ngt-group [keyboardControls]="controlsMap">
	<!-- descendants can inject the controls -->
</ngt-group>
```

or via `hostDirectives`:

```angular-ts
@Component({
	hostDirectives: [NgtsKeyboardControls],
})
export class Scene {
	constructor() {
		inject(NgtsKeyboardControls).map.set(controlsMap);
	}
}
```

Consume in any descendant. There are three consumption forms: reactive per-action signals, non-reactive per-frame polling, and edge events.

```angular-ts
export class Player {
	private keyboardControls = injectKeyboardControls();
	// reactive: memoized Signal<boolean> per action
	protected jumping = this.keyboardControls.select('jump');
	constructor() {
		// transient: poll non-reactive snapshot in the frame loop
		beforeRender(({ delta }) => {
			const { forward, back, left, right } = this.keyboardControls.snapshot;
		});
		// edge events for discrete actions
		const sub = this.keyboardControls.keyChange.subscribe(({ name, pressed }) => {
			if (name === 'jump' && pressed) {
				/* jump */
			}
		});
		inject(DestroyRef).onDestroy(() => sub.unsubscribe());
	}
}
```

### Properties and Methods

| Property/Method | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `state`         | Readonly signal containing the full pressed state of all actions.        |
| `select(name)`  | Memoized per-action `Signal<boolean>`.                                   |
| `snapshot`      | Getter returning the current state for non-reactive per-frame polling.   |

### Standalone Functions

#### `injectKeyboardControls<TName>()`

Injects the nearest `NgtsKeyboardControls`, typed to the action names. Throws a friendly error when used outside of a `NgtsKeyboardControls` context.

#### `createKeyboardControls([...entries])`

Module-level identity factory. Infers action names as literal types and returns `{ controlsMap, injectKeyboardControls }` pre-typed so consumers never repeat the generic.

### Differences from Drei

- `keyChange` emits on action transitions only — no auto-repeat spam from held keys.
- Held keys are reference-counted per action: releasing `KeyW` while `ArrowUp` is held keeps `'forward'` pressed.
- `toggle: true` mode — Drei has no toggle mode; its `up: false` latch forces `onChange` consumption, whereas `toggle` + `select()` gives a live boolean signal.
- `preventDefault` option to stop default browser behavior (e.g. Space scrolling the page) for mapped keys.
- The pressed state is not wiped when the `map` changes.
