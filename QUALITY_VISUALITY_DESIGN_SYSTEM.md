# Quality Visuality — живий дизайн-бриф

## 1. UX-ядро
- Homepage = Portal Room, not a service catalog.
- Opening orbit = five real Solar System bodies as visual archetypes.
- Motion = counter-clockwise.
- Main invitation = «Яка стихія сьогодні кличе тебе?».
- Center = Brand / Ether / wholeness.
- Click on a body = immersive portal modal.

## 2. Visual language
- Adult magic: cinematic, realistic, tactile, restrained.
- No cartoon fairies, fantasy game UI, or childish mascots.
- Mythic imagery belongs inside portals; opening screen remains celestial.
- Water: Neptune / immersion / water wheel / ocean world.
- Wood: Jupiter / growth / giant trees / forest light.
- Fire: Sun / action / fireplace / embers.
- Earth: Earth / embodiment / forest path / cave / crystals.
- Metal: Saturn / system / gong / handpan / mechanisms / sacred geometry.
- Brand: living city / roads / bicycle / people / birds / subtle 936 Hz.

## 3. Portal interaction
- Hover: light, pulse, depth, slight scale.
- Click: open scene, soundscape, meaning, tools, cases and CTA.
- Each portal has a natural sound layer plus a symbolic frequency reference.
- Audio starts only after user interaction because browsers block unsolicited autoplay.

## 4. Sound design map
- Water: 741 Hz / Vishuddha reference + water ambience.
- Wood: 639 Hz / Anahata reference + forest/birds.
- Fire: 396 Hz / Muladhara reference + fire/embers.
- Earth: 174 Hz grounding tone + low-earth ambience.
- Metal: gong/handpan + structural resonance.
- Brand: 936 Hz extremely quiet layer + city ambience.

These frequency associations are presented as symbolic sound design, not as medical or scientific claims. Modern Solfeggio/chakra mappings vary by tradition.

## 5. Business UX
Every service tool must be clickable and answer:
1. What problem does this solve?
2. What do we create together?
3. What does the client receive?
4. Can it be bought separately?
5. What kind of case/result can it produce?
6. How do we start?
7. CTA = «Написати мені».

Pricing is not invented in the interface. Until fixed, the site says that price and format are agreed after a short brief.

## 6. Current implementation
- React / CRA + CRACO.
- Vercel deployment connected to GitHub.
- Main interaction: `ElementWheel.jsx`.
- Planet layer: `Planet.jsx`.
- Immersive portal: `ElementModal.jsx`.
- Portal particles: `ElementCanvas.jsx`.
- Tools: `Tools.jsx` + `ToolModal.jsx`.
- Expandable stages: `StagesAccordion.jsx`.
- Audio: `lib/audio.js`.
- Content/cases: `mock.js`.

## 7. Future image work
The user's supplied portal-room reference should become the visual master reference for the Portal Room. When the binary image is available in the repository, use it as the scene asset rather than replacing it with a different generated style.

Next visual pass should replace generic scene backgrounds with five dedicated cinematic portal-room assets while preserving the interaction architecture.
