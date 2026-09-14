Reading this as: developer field-notebook for recruiters + collaborators, with a retro-vintage-doodle impeccable language, leaning toward paper + ink + sticker stamps + Three.js ink-dots + Anime.js hand-drawn timelines.

# Adhithan Super Portfolio V2 — Retro / Vintage / Doodle / Impeccable Abstraction

## 1. You asked, I used
You gave 14 sources. All harvested into `skills/` + `_skills_src/`:

- trendmicro-frontend/awesome + requestly/awesome-frontend-resources: vanilla Vite, particle field, scroll-dives, no-framework speed
- anthropics frontend-design SKILL.md: brief wins over defaults — you said retro/vintage/doodle, so cream paper wins even though cream is listed as a generic tell. One orchestrated intro, type as character, self-critique
- ComposioHQ / BehiSecc / travisvn awesome-claude-skills: agentic component states (default/hover/focus/disabled) on every card
- Leonxlnx taste-skill (local): Design Read above, dials now 8 / 7 / 4 — playful agency portfolio, cinematic but airy
- nextlevelbuilder ui-ux-pro-max-skill: gallery-grade cards, focus-visible, preview thinking
- sickn33 antigravity-awesome-skills `3d-web-experience/SKILL.md`: Three.js vanilla for max control (not R3F, not Spline), poly <100k, no heavy GLB, DPR clamp, scroll-driven camera
- awesomeskill.ai/category: discovery path to the 5 below
- bergside/awesome-design-skills x5 (the core skin):
  - retro: Macondo display, #3B82F6 / #8B5CF6 high-contrast ink, 4/8/12/16/24/32, hand-lettered sign energy
  - vintage: Silkscreen pixel labels, #008080 teal primary, #C0C0C0 silver surface, #000 text, 1950s-90s skeuomorph + grain
  - doodle: Delius Swash Caps notes, #49B6E5 / #263D5B, imperfect hand borders, playful
  - impeccable: Chakra Petch body, cream + burnt-orange #CC8800 alternating sections, rust #C55221, editorial poster rhythm 12/14/16/20/24/32
  - paper: print grain, minimal ink, tactile surface
- colaberry ai-asset-gen + alonw0 web-asset-generator: generate locally — og-cover.svg, doodle squiggles, paper grain via SVG noise, tape via CSS. Zero downloads, zero licensing risk.

## 2. V2 tokens — Field Notebook
- paper `#F4F1EA`, paper-2 `#EDE6D6`, ink `#1C1917`, muted `#6B5E4F`
- retro blue `#3B82F6`, violet `#8B5CF6`, vintage teal `#008080`, doodle sky `#49B6E5` / navy `#263D5B`, impeccable amber `#CC8800` / rust `#C55221`, stamp red `#DC2626`
- Type: Macondo (hero poster) + Delius Swash Caps (hand notes) + Silkscreen (stamps/labels) + Chakra Petch (body editorial) + JetBrains Mono (code — all 5 skills agree on this)
- Doodle border: `255px 15px 225px 15px / 15px 225px 15px 255px`, 2px ink, rotate -1.5deg / +1deg, washi tape on top
- Sections alternate cream / burnt-orange wash (impeccable rule), grain overlay everywhere, halftone dots in hero

## 3. Three.js + Anime.js in retro skin
- Three.js vanilla: ink-dot particle field (900 pts, #1C1917 + #CC8800 sparks), rust links, cream fog #F4F1EA, wireframe core burnt-orange. Canvas `mix-blend-mode:multiply` so it prints onto paper. Scroll dives still tween camState.
- Anime.js: terminal types ticket, hero lines pop with slight rotate (sticker), SVG squiggle draws via stroke-dashoffset, cards pop on reveal, stamps slam with scale 2.2->1 + rotate. Reduced-motion kills all.

## 4. Structure (same content, new clothes)
Hero ticket / marquee / About polaroid + profile.tsx / Stack ledger bars / Work sticker cards (GI, Freshness, Engine) / Journey stamped timeline / Contact postcard. Footer colophon.

## 5. QA
- Vite build passes, dist/ static for Render
- Keyboard focus ink outline, contrast ink-on-cream AA, mobile single column, canvas 35% opacity
- No backend, data in data.js, images reused Cloudinary + Unsplash, rest generated
