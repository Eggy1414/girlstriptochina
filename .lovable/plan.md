

# Minimalist Red Background with White Text

Redesign the entire app to have a bold red background with white text in a clean, minimalist style.

## Changes Overview

### 1. CSS Variables (src/index.css)
- Set `--background` to a rich Chinese red (approximately hsl(0, 75%, 40%))
- Set `--foreground` to white
- Set `--card` to a slightly lighter/darker red for subtle contrast (semi-transparent white overlay)
- Set `--card-foreground` to white
- Set `--muted` to a darker red tone
- Set `--muted-foreground` to a soft white/cream (rgba white with some opacity)
- Set `--border` to a subtle red-tinted border (lighter red)
- Set `--primary` to white (inverted — buttons become white on red)
- Set `--primary-foreground` to red (text on white buttons)
- Remove or simplify city accent colors to keep them minimal (white outlines instead of colorful backgrounds)

### 2. Component Style Updates

**Index.tsx (Nav bar)**
- Nav becomes transparent/red with white text, remove backdrop-blur card background
- Active tab: white background with red text; Inactive: white text with hover

**TripDashboard.tsx**
- Remove shadow-heavy cards, use thin white borders instead
- Countdown and stats use white text on red
- Route cities: use white-bordered cards instead of colorful city backgrounds

**Timeline.tsx**
- City group headers: white text with white border bottom instead of colored backgrounds
- Day items: minimal white borders, white text
- Remove heavy card backgrounds

**BudgetTracker.tsx**
- Cards become minimal with white borders
- Progress bar: white track on red
- Category/city filter buttons: white outline style

**Attractions.tsx**
- Cards with white borders, no shadows
- Badges: white outline
- Filter buttons: white outline active state

**PhotoGuide.tsx**
- Same minimal white-bordered cards
- Tab buttons: white fill when active

**PackingList.tsx**
- Checkbox styling adjusted for white on red
- Cards with white borders
- Minimal styling throughout

### 3. Shared UI Components
- **Card** (card.tsx): The CSS variable change will handle this automatically
- **Button**: Primary variant will become white-on-red via CSS variables
- **Progress**: Track and fill colors via CSS variables
- **Badge**: Will inherit the new color scheme

### Design Principles
- No shadows (or very subtle ones)
- Thin white borders for separation
- Generous whitespace
- Clean typography with high contrast (white on red)
- Reduced use of emoji (keep a few key ones)
- Flat, borderless design where possible

## Technical Details

**Files to modify:**
1. `src/index.css` — New color variables for red bg + white text
2. `src/data/tripData.ts` — Update city bgClass to use minimal white-bordered style
3. `src/pages/Index.tsx` — Simplify nav styling
4. `src/components/TripDashboard.tsx` — Minimal card styles, white borders
5. `src/components/Timeline.tsx` — White-bordered city headers, minimal activity rows
6. `src/components/BudgetTracker.tsx` — White-bordered cards, white progress bar
7. `src/components/Attractions.tsx` — Minimal cards with white borders
8. `src/components/PhotoGuide.tsx` — Minimal cards
9. `src/components/PackingList.tsx` — Minimal styling

