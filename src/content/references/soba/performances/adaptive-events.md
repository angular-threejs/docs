---
credits:
    text: 'Credits: AdaptiveEvents from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/adaptive-events'
---

`NgtsAdaptiveEvents` is a port of [Drei's `AdaptiveEvents`](https://drei.docs.pmnd.rs/performances/adaptive-events) which dynamically toggles event handling based on the canvas' performance settings. When performance degrades, event handling is disabled to reduce computational overhead.

This is particularly useful when combined with `NgtsAdaptiveDpr` and controls that support the `regress` flag (like `NgtsOrbitControls`).

### Usage

```angular-ts
import { NgtsAdaptiveEvents } from 'angular-three-soba/performances';
```

```angular-html
<ngts-adaptive-events />
```

### Example with Controls

```angular-html
<ngts-adaptive-dpr [pixelated]="true" />
<ngts-adaptive-events />
<ngts-orbit-controls [options]="{ regress: true }" />
```

When the camera is moving (regress is triggered), events are disabled to improve performance during the interaction.
