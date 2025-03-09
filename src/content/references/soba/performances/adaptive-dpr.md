---
credits:
    text: 'Credits: AdaptiveDpr from Drei'
    link: 'https://drei.docs.pmnd.rs/performances/adaptive-dpr'
inputs:
    - name: 'pixelated'
      type: 'boolean'
      description: 'pixelated, default to false'
---

`NgtsAdaptiveDpr` is a port of [Drei's `AdaptiveDpr`](https://drei.docs.pmnd.rs/performances/adaptive-dpr) which dynamically adjusts the device pixel ratio (DPR) based on the canvas' performance settings to improve performance. This allows for dynamic quality adjustment to maintain performance, for example during camera movements (see `regress` flag in Soba's controls).

### Usage

```angular-ts
import { NgtsAdaptiveDpr } from 'angular-three-soba/performances';
```

```angular-html
<ngts-adaptive-dpr [pixelated]="pixelated()" />
```