# Gen-Z Dark Rave Portfolio - Design Guidelines

## Design Approach
**Reference-Based**: Draw from cyberpunk aesthetics, rave culture, and modern gaming UIs. Think Cyberpunk 2077 meets Spotify meets underground techno club visuals.

## Core Design Principles
- **Maximum Visual Impact**: Every element should glow, pulse, or react
- **Neon Everything**: Embrace excessive glow effects and high saturation
- **Controlled Chaos**: Glitchy, energetic, but still usable
- **Dark Foundation**: Pure black backgrounds to make neons pop

## Color System
```
Primary Palette:
- Base: Pure black (#000000)
- Neon Purple: #A855F7, #9333EA, #7E22CE
- Neon Blue: #3B82F6, #2563EB, #06B6D4
- Neon Pink: #EC4899, #DB2777
- Neon Green: #10B981, #059669 (accents only)
- Glitch Red: #EF4444 (error states, glitch effects)

Background Treatments:
- Noise texture overlay (10-15% opacity)
- Animated rave grid pattern
- Gradient overlays with radial neon glows
```

## Typography
```
Primary Font: Space Grotesk or JetBrains Mono (cyberpunk/tech feel)
Secondary Font: Inter (UI elements)

Hierarchy:
- Hero: 4xl to 6xl, ultra-bold, neon glow text-shadow
- Section Headings: 3xl to 4xl, bold, subtle glow
- Body: base to lg, medium weight, high line-height (1.7)
- Labels/Badges: xs to sm, uppercase, tight tracking

Neon Text Effect:
- Multiple text-shadow layers for glow
- Slight blur for holographic feel
- Animated pulse on key headings
```

## Layout System
```
Spacing: Tailwind units 4, 6, 8, 12, 16, 24
Container: max-w-7xl with px-6 to px-12
Grid Systems: 
- Projects: 3-column grid (lg), 2-col (md), 1-col (mobile)
- Skills: 4-column grid, masonry-style stagger
```

## Component Library

### Navigation
- Fixed top navbar with blur backdrop
- Logo with neon glow on left
- Centered nav links with underline animations (neon trail effect)
- Magnetic hover effect on all nav items
- Mobile: Slide-in menu with glitch transition

### Hero Section (Home)
- Full viewport height (100vh)
- Three.js canvas background: floating neon particles OR glowing energy sphere
- Centered animated text with typewriter + glitch effect
- Multiple CTA buttons with magnetic attraction
- Rave grid overlay animating across background
- NO hero image - pure 3D canvas + text

### Project Cards
- Hologram-style cards with:
  - Thick neon border (gradient purple to blue)
  - Dark translucent background with noise
  - 3D tilt on hover (transform: rotateX/Y)
  - Glitch effect on image/title
  - Tech stack badges at bottom (pill shape, neon borders)
  - Hover: scale(1.05) + intensified glow

### Skill Grid
- Category headers with neon underline
- Grid items: rounded rectangles with:
  - Icon or text
  - Neon border pulse animation
  - Staggered reveal on scroll
  - Random slight rotation for chaotic energy

### Timeline (Experience/Education)
- Vertical line with neon gradient (purple to blue)
- Timeline nodes: pulsing circles
- Content cards alternating left/right (desktop), stacked (mobile)
- Connecting lines animate on reveal
- Each entry has hologram card styling

### Contact Form
- Input fields with:
  - Transparent backgrounds
  - Thick neon borders
  - Focus: glow intensifies
  - Labels animate above on focus
- Submit button: magnetic effect + rave pulse animation
- Success state: glitch animation

### Buttons
- Primary: Solid neon fill with darker border
- Secondary: Transparent with neon border
- Magnetic effect: elements "pull" toward cursor within 100px
- Hover: glow intensifies, slight scale
- Active: brief glitch distortion

### Custom Cursor
- Hide default cursor
- Custom element: small neon circle (12px)
- Trailing glow effect (blur + opacity fade)
- Expands on hover over interactive elements
- Color shifts based on context (purple default, blue on links)

### Footer
- Full width, dark with noise overlay
- Three columns: About, Quick Links, Social
- Neon line separator at top
- Social icons with glow on hover
- Copyright with glitch animation on hover

## Animations

### Page Transitions (Barba.js)
- Exit: fade out with slight scale down (0.95)
- Enter: fade in with glitch distortion effect
- Duration: 600-800ms
- Project pages: special glitch wipe transition

### Scroll Animations (Framer Motion)
- Cards: fade up + slight rotation
- Headings: glitch in + glow pulse
- Timeline: draw line animation
- Stagger children by 100-150ms

### Micro-interactions
- Button magnetic pull: transform translate based on mouse position
- Card tilt: calculate 3D rotation from mouse position
- Hover glows: scale filter blur and opacity
- Text glitch: randomly offset text layers briefly
- Rave pulse: scale + opacity keyframe loop

### Preloader
- Centered neon logo or text
- Pulsing glow (scale 1.0 to 1.2)
- Scanline effect sweeping vertically
- Progress bar with neon fill

### Easter Egg (Konami Code)
- Trigger "RAVE MODE"
- All neons rapidly cycle colors (hue-rotate animation)
- Background grid accelerates
- Text elements get extreme glitch
- Particles multiply and speed up
- Toggle off with same code

## Special Effects

### Background Rave Grid
- CSS grid pattern (50px squares)
- Animated: translate + opacity pulse
- Neon stroke color rotating through purple/blue
- Perspective tilt for depth

### Noise Overlay
- SVG or CSS filter
- 10-15% opacity
- Fixed position, covers viewport
- Subtle animated grain

### Holographic Effect
- Linear gradient border (45deg, purple to blue to pink)
- Slight backdrop blur
- Iridescent shine on hover (gradient shift)

### Glitch Effect
- RGB split: offset red/blue channels
- Horizontal slicing with transform skew
- Random timing, brief duration (100-200ms)
- Triggered on hover or scroll reveals

## Responsive Breakpoints
- Mobile: < 640px - Single column, stacked nav, reduced animations
- Tablet: 640px - 1024px - Two columns, simplified 3D effects
- Desktop: > 1024px - Full effects, multi-column grids

## Performance Considerations
- Reduce Three.js particle count on mobile (100 vs 1000)
- Disable magnetic effects on touch devices
- Use CSS animations over JS where possible
- Lazy load Three.js canvas after initial render
- Optimize glitch effects (use CSS transforms, not filters)

## Images
**NO hero images** - Hero section is pure Three.js 3D canvas with particles/energy sphere. Project cards may use placeholder project screenshots with holographic overlay treatment.