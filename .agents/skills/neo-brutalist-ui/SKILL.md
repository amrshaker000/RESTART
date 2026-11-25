---
name: neo-brutalist-ui
description: Conventions for building Playful Neo-Brutalist UI components for RESTART
---

# Neo-Brutalist UI Guidelines

## 1. Outlines & Borders
- Use `2px` to `3px` solid `#0B1F44` (Navy).
- Outlines must remain visible on both light and dark backgrounds.

## 2. Hard Offset Shadows
- No blurred drop-shadows.
- `box-shadow: 3px 3px 0px #0B1F44` (Small badges)
- `box-shadow: 5px 5px 0px #0B1F44` (Standard cards and buttons)
- `box-shadow: 7px 7px 0px #0B1F44` (Hero window frames)

## 3. Button Press Effect
```css
.btn-press:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0px #0B1F44 !important;
}
```

## 4. Backgrounds & Textures
- Use fine square grid pattern: `bg-grid-pattern`
- Layered surfaces: white card on light-blue offset with navy border
- Window frame with 3 traffic dots (red, yellow, green) inspired by the post template.
