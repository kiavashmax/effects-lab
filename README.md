# Effects Lab

Fifty web effects. Each card has a Copy button that pulls the exact
CSS rule set out of the page's stylesheet, plus a JS snippet for the
interactive ones.

Live: https://kiavashmax.github.io/effects-lab/

## The set

| # | Name | Technique |
|---|---|---|
| 01 | Lift | `transform: translateY` + shadow |
| 02 | Glow | Multi-layer `box-shadow` |
| 03 | Shine | Diagonal gradient sweep |
| 04 | Trace | `clip-path` wipe on a border |
| 05 | Glitch | Multi-color `text-shadow` keyframes |
| 06 | Gradient text | `background-clip: text` animation |
| 07 | Neon | Layered `text-shadow` pulse |
| 08 | Stroke | `-webkit-text-stroke` + hover fill |
| 09 | Spotlight | Radial gradient at `--mx`/`--my` |
| 10 | Magnetic | `transform` towards cursor |
| 11 | Follower | Lerped dot trailing the cursor |
| 12 | Ripple | Expanding circle on click |
| 13 | Button fill | Pseudo-element slides up |
| 14 | Button slide | Gradient slides in from left |
| 15 | Button arrow | Arrow slides forward |
| 16 | Button bounce | Quick keyframe hop |
| 17 | Typewriter | `width` animation + blinking caret |
| 18 | Pulse | Expanding box-shadow ring |
| 19 | Spinner | Rotating `border-top` ring |
| 20 | Skeleton | Shimmer on placeholder bars |
| 21 | Gradient anim | Moving `background-position` |
| 22 | Mesh | Layered radial gradients |
| 23 | Noise | SVG `feTurbulence` grain |
| 24 | Aurora | Blurred drifting light bands |

## Theme

A theme toggle in the header switches dark and light, saved in
`localStorage`. Effects 05, 07, 21, 22, 24 keep their own look because the
colors are part of the effect.

## Stack

- Plain HTML, CSS, JavaScript
- Copy button extracts rules from `document.styleSheets` and reads JS
  snippets from `script[type="text/plain"]` blocks

## Run

Open `index.html` directly, or use `run.bat` / `run.sh`.

## Deploy

Run `deploy.bat`.

## License

MIT &copy; 2026 [@kiavashmax](https://github.com/kiavashmax). See LICENSE.