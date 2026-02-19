# SideQuest iOS App — Design Specification

This document is the definitive design reference for all 22 iOS app screens. It contains every color, font size, spacing value, border radius, opacity, gradient, and layout rule needed to build these screens pixel-perfectly in SwiftUI (or any iOS framework). Use this alongside the SwiftUI source files in this folder.

The live interactive reference is at: `/designs` route of the Replit project.

---

## Table of Contents

1. [Global Design System](#1-global-design-system)
2. [Shared Components](#2-shared-components)
3. [Auth Screens (3)](#3-auth-screens)
4. [Onboarding Screens (8)](#4-onboarding-screens)
5. [Feature Screens (4)](#5-feature-screens)
6. [Trip Screens (4)](#6-trip-screens)
7. [Profile Screens (3)](#7-profile-screens)
8. [Screen Map & Navigation](#8-screen-map--navigation)

---

## 1. Global Design System

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0A0A0A` | App background, all screens |
| `phoneFrameBottom` | `#171717` | Phone frame gradient end |
| `phoneFrameTop` | `#222222` | Phone frame gradient start |
| `notchFill` | `#1A1A1A` | Dynamic island/notch |
| `orange` (primary) | `#F97316` | Primary accent, CTAs, active states |
| `amber` | `#F59E0B` | Gradient endpoints, secondary accent |
| `amber400` | `#FBBF24` | Slider fills, progress bars |
| `amber600` | `#D97706` | Bronze rank, gradient endpoints |
| `emerald` | `#34D399` | Success states, confirmations, vote accept |
| `red` | `#F87171` | Error states, reject, sign out |
| `blue` | `#60A5FA` | Pace slider, secondary progress |
| `cyan` | `#22D3EE` | Diamond rank, pace gradient |
| `purple` | `#A78BFA` | Obsidian rank, evening tint |

### 1.2 White + Opacity System

These are used everywhere for text, borders, and backgrounds:

| Pattern | Value | Usage |
|---------|-------|-------|
| `white/80` | `rgba(255,255,255,0.80)` | Primary body text, member names |
| `white/70` | `rgba(255,255,255,0.70)` | Settings row labels, social button text |
| `white/60` | `rgba(255,255,255,0.60)` | Schedule item names, copy button |
| `white/50` | `rgba(255,255,255,0.50)` | Budget breakdown amounts |
| `white/35` | `rgba(255,255,255,0.35)` | Status bar, location subtext |
| `white/30` | `rgba(255,255,255,0.30)` | Vote fractions, breakdown labels |
| `white/25` | `rgba(255,255,255,0.25)` | Subtitles, descriptions, phone labels |
| `white/20` | `rgba(255,255,255,0.20)` | Placeholder text, input hints, sub-labels |
| `white/15` | `rgba(255,255,255,0.15)` | "Maybe Later", settings chevrons, section headers |
| `white/12` | `rgba(255,255,255,0.12)` | "or" divider, XP text, section labels, stat labels |
| `white/10` | `rgba(255,255,255,0.10)` | Drag handle icon, footer hints |
| `white/8` | `rgba(255,255,255,0.08)` | Inactive dots, chevron arrows |
| `white/5` | `rgba(255,255,255,0.05)` | Card/input backgrounds, borders |
| `white/4` | `rgba(255,255,255,0.04)` | Invite code card background |
| `white/3` | `rgba(255,255,255,0.03)` | Unselected style tiles, divider lines, stat cards |
| `white/2` | `rgba(255,255,255,0.02)` | Locked badge backgrounds |

### 1.3 Orange + Opacity System

| Pattern | Value | Usage |
|---------|-------|-------|
| `orange/60` | `rgba(249,115,22,0.60)` | ScreenHeader label, "Forgot password?" |
| `orange/50` | `rgba(249,115,22,0.50)` | "Welcome to" text, profile header label |
| `orange/40` | `rgba(249,115,22,0.40)` | Section header labels on designs page |
| `orange/25` | `rgba(249,115,22,0.25)` | Selected style border, selected tag border |
| `orange/20` | `rgba(249,115,22,0.20)` | Highlight PillRow border, orange cards |
| `orange/15` | `rgba(249,115,22,0.15)` | Badge borders, achievement borders |
| `orange/12` | `rgba(249,115,22,0.12)` | Active day tab background |
| `orange/10` | `rgba(249,115,22,0.10)` | Owner badge bg, share button bg, rank badge bg |
| `orange/8` | `rgba(249,115,22,0.08)` | Highlighted pill bg, rank card bg, profile card bg |
| `orange/6` | `rgba(249,115,22,0.06)` | Selected travel style tile bg |

### 1.4 Typography

| Role | Font Family | Size | Weight | Tracking |
|------|-------------|------|--------|----------|
| Screen title | System (SF Pro) | 22px | Bold | 0 |
| Welcome title | System | 26px | Bold | 0 |
| Budget amount | System | 32px | Bold | 0 |
| Slider label | System | 24px | Bold | 0 |
| Profile name | System | 18px | Bold | 0 |
| Body/pill text | System | 15px | Semibold | 0 |
| Input placeholder | System | 14px | Regular | 0 |
| Subtitle | System | 13px | Regular/Medium | 0 |
| Section label (uppercase) | System | 10px | Bold | 2.0-2.5 |
| Counter text | System | 12px | Regular | 0 |
| Stat label | System | 9px | Medium | 0 |
| Rank badge | System | 8px | Bold | 1.2 |
| Monospaced (times/codes) | SF Mono | 12-26px | Bold | varies |

**Note:** The React mockups use system fonts rendered at these pixel sizes. In SwiftUI, use `.system(size:weight:)` with equivalent values. If you want the web version's look (Outfit for display, Inter for body), register those custom fonts in your Xcode project.

### 1.5 Corner Radii

| Element | Radius |
|---------|--------|
| Phone frame outer | 48px (3rem) |
| Phone screen inner | 35px (2.2rem) |
| Cards, inputs, buttons | 16px (1rem = rounded-2xl) |
| Day tabs, code boxes | 12px (rounded-xl) |
| Interest tags | Full (capsule/rounded-full) |
| Avatar, badges | Full (circle) |
| Notch | 24px (rounded-b-3xl) |
| Destination card | 24px (rounded-3xl) |

### 1.6 Spacing Scale

Based on Tailwind's 4px base unit:

| Token | Value | Common usage |
|-------|-------|-------------|
| `0.5` | 2px | Divider gaps, sub-text top margin |
| `1` | 4px | Progress dot padding-top |
| `1.5` | 6px | Progress dot gap, subtitle top margin |
| `2` | 8px | Status bar bottom padding, stat grid gap |
| `2.5` | 10px | Tag gap, day tab gap, code box gap, ScreenHeader label bottom |
| `3` | 12px | Input field gap, PillRow stack gap, button bottom gap |
| `3.5` | 14px | Social button vertical padding, member row vertical padding |
| `4` | 16px | PillRow horizontal/vertical padding, itinerary item padding |
| `5` | 20px | Card internal padding, section horizontal padding |
| `6` | 24px | Screen horizontal padding (auth/onboarding), input bottom margin |
| `7` | 28px | ScreenHeader bottom margin, day tab bottom margin |
| `8` | 32px | Social button group bottom, welcome icon bottom, code boxes bottom |
| `10` | 40px | Welcome app icon bottom margin |
| `12` | 48px | Description bottom margin, slider bottom label margin |

### 1.7 Gradients

| Name | Type | Colors | Usage |
|------|------|--------|-------|
| Orange CTA | Linear L→R | `#F97316` → `#F59E0B` | "Start Exploring", "Join Trip" buttons |
| App Icon | Linear TL→BR | `#F97316` → `#D97706` | Welcome screen app icon, trophy badge |
| Budget Progress | Linear L→R | `#F97316` → `#FBBF24` | Progress bars, rank bars, XP bars |
| Pace Slider | Linear L→R | `#60A5FA` → `#22D3EE` | Pace screen slider fill |
| Phone Frame | Linear T→B | `#222222` → `#171717` | Phone bezel |
| Destination Card BG | Linear TL→BR | `emerald-700/40` → `teal-600/25` → `cyan-500/15` | SwipeToVote card |
| Card Text Overlay | Linear B→T | `black/80` → `transparent` | Text readability on destination card |

### 1.8 Shadows

| Element | Color | Radius | Usage |
|---------|-------|--------|-------|
| Phone frame | `black/60` | 2xl (25px) | Outer phone shadow |
| App icon | `orange/25` | xl (20px) | Welcome screen "S" icon |
| Slider thumb | `orange/30` or `blue/30` | lg (10px) | Budget/Pace slider handles |
| CTA gradient button | `orange/20` or `orange/15` | lg (10px) | "Start Exploring", "Join Trip" |
| Destination card | `black/40` | xl (20px) | SwipeToVote image card |
| Trophy badge | `orange/25` | lg (10px) | Profile avatar badge |

### 1.9 Borders

Default border: `1px solid white/5` (most cards, inputs)

| State | Border |
|-------|--------|
| Default card/input | `1px white/5` |
| Highlighted/selected | `1px orange/20` |
| Selected tag | `1px orange/25` |
| Success state | `1px emerald/15` |
| Vote reject circle | `2px red/25` |
| Vote accept circle | `2px emerald/25` |
| Avatar ring | `2.5px orange/35` |
| Online indicator border | `2px #0A0A0A` (background color) |
| Divider line | `1px white/3` |
| Day tab active | `1px orange/20` |
| Day tab inactive | `1px white/3` |

---

## 2. Shared Components

### 2.1 StatusBar

Position: Top of every screen
Layout: HStack, justify space-between
Padding: horizontal 24px, bottom 8px
Content:
- Left: "9:41" — 10px, semibold, white/35
- Right: signal icon (10px) + wifi icon (10px) + battery icon (12px), gap 6px, white/35
SF Symbols: `cellularbars`, `wifi`, `battery.100`

### 2.2 ScreenHeader

Layout: VStack, center-aligned, bottom margin 28px
- Label: UPPERCASE, 10px bold, tracking 2.5, orange/60
- Title: 22px bold, white, top margin 10px from label
- Subtitle (optional): 13px regular, white/25, top margin 6px

### 2.3 PillRow

Layout: HStack, gap 16px
Padding: horizontal 20px, vertical 16px
Corner radius: 16px
- Default: bg white/5, border white/5
- Highlighted: bg orange/8, border orange/20
Content:
- Emoji: 22px, no shrink
- Text column (VStack, leading):
  - Primary: 15px semibold, white
  - Sub (optional): 11px, white/20, top margin 2px
- Right slot: flexible (can contain check, amount+check, etc.)

### 2.4 ProgressDots

Layout: HStack, centered, gap 6px
Padding: top 4px, bottom 24px
Total dots: 8
- Active dot: width 28px, height 6px, capsule, orange (full opacity)
- Inactive dot: width 6px, height 6px, circle, white/8

### 2.5 InputField

Layout: full-width container
Padding: horizontal 20px, vertical 16px
Corner radius: 16px
Background: white/5
Border: 1px white/5
Placeholder: 14px regular, white/20

### 2.6 PrimaryButton

Layout: full-width, centered text
Padding: vertical 16px
Corner radius: 16px
Two variants:
- **Solid white**: bg white, text black, 15px bold
- **Gradient**: linear orange→amber, text white, 15px bold, shadow orange/20

### 2.7 GreenCheck

Icon: checkmark (SF Symbol `checkmark`)
Size: 14px (in SwiftUI; 18px with strokeWidth 2.5 in React)
Color: emerald (#34D399)
Weight: bold

### 2.8 SliderTrack

Layout: GeometryReader for proportional fill
Track: capsule, height 10px, bg white/6
Fill: capsule, height 10px, gradient (varies per screen)
Thumb: circle 24px, white fill, 2px border (color varies), shadow (color varies, radius 6px)
Position: thumb center at `progress * trackWidth`

---

## 3. Auth Screens

### 3.1 Sign In

**Glow:** orange
**Layout:** px-24, vertical center

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Welcome Back", title: "Sign In" |
| Email input | InputField "Email address" |
| Password input | InputField "Password" |
| Gap between inputs | 12px |
| Inputs to forgot link | 20px |
| "Forgot password?" | 12px medium, orange/60, right-aligned |
| Forgot to button | 24px |
| "Sign In" button | PrimaryButton solid white |
| Button to divider | 20px |
| Divider | line—"or"—line, "or" is 11px white/12 |
| Divider to socials | 20px |
| Social buttons | HStack gap 12px, each: bg white/5, border white/5, radius 16px, py 14px. Apple: apple.logo 18px white + "Apple" 14px medium white/70. Google: "G" 14px bold white + "Google" 14px medium white/70 |
| Socials to footer | 32px |
| Footer | "Don't have an account?" 13px white/15 + "Sign Up" 13px bold orange |

### 3.2 Sign Up

**Glow:** none
**Layout:** px-24, vertical center

Same structure as Sign In except:
- ScreenHeader: label "Get Started", title "Create Account"
- 3 inputs: Email, Password, Confirm password
- Button text: "Sign Up"
- Footer: "Already have an account?" + "Sign In"

### 3.3 Reset Password

**Glow:** none
**Layout:** px-24, vertical center

| Element | Spec |
|---------|------|
| Emoji | "🔐" 40px, centered, bottom 24px |
| ScreenHeader | label: "Forgot Password", title: "Reset Password", subtitle: "Enter your email to receive a reset link." |
| Email input | InputField "Email address" |
| Input to button | 24px |
| Button | PrimaryButton "Send Reset Link" solid white |

---

## 4. Onboarding Screens

All onboarding screens share:
- StatusBar at top
- ProgressDots showing current step (0-7)
- "Continue" PrimaryButton at bottom (solid white)
- Layout: px-24

### 4.1 Welcome (Step 0)

**Glow:** orange
**Layout:** vertical + horizontal center, text-center

| Element | Spec |
|---------|------|
| App icon | 96x96px, rounded rect radius 28px, gradient TL→BR orange→amber600, "S" 40px bold white, shadow orange/25 radius 16px |
| Icon to "Welcome to" | 40px |
| "Welcome to" | 10px bold UPPERCASE, tracking 2.5, orange/50 |
| Label to title | 12px |
| "SideQuest" | 26px bold, white |
| Title to desc | 16px |
| Description | "Discover hidden gems, plan epic trips, and travel like a local — not a tourist." 14px, white/25, line-spacing 4px |
| Desc to button | 48px |
| Button | PrimaryButton "Let's Go" |
| ProgressDots | step 0, after button |

### 4.2 Trip Intent (Step 1)

**Glow:** none

| Element | Spec |
|---------|------|
| ProgressDots | step 1, at top |
| ScreenHeader | label: "Step 2", title: "What brings you here?" |
| Options (VStack gap 12px) | 4 PillRows: |
| | "🗺️" "Planning a specific trip" — highlighted, green check |
| | "💡" "Exploring ideas" — default |
| | "👥" "Finding travel buddies" — default |
| | "🌍" "Building a bucket list" — default |
| Button | "Continue" at bottom, top margin 24px |

### 4.3 Travel Style (Step 2)

**Glow:** none

| Element | Spec |
|---------|------|
| ProgressDots | step 2 |
| ScreenHeader | label: "Step 3", title: "Travel Style", subtitle: "Pick all that apply." |
| Grid | 2 columns, gap 12px |
| Each tile | radius 16px, padding 16px, center-aligned VStack gap 10px |
| | Emoji: 30px |
| | Label: 14px medium, white/80 |
| | If selected: 20px circle, orange fill, checkmark 9px bold white inside |
| Selected state | border orange/25, bg orange/6 |
| Unselected state | border white/5, bg white/3 |
| Data | Adventure ✓, Culture ✓, Foodie ✗, Relaxation ✗, Nightlife ✓, Nature ✗ |

### 4.4 Interests (Step 3)

**Glow:** none

| Element | Spec |
|---------|------|
| ProgressDots | step 3 |
| ScreenHeader | label: "Step 4", title: "Interests", subtitle: "Select at least 3." |
| Tags | FlowLayout (wrapping), gap 10px |
| Each tag | capsule (full radius), px 16px, py 10px, 13px medium |
| Selected | border orange/25, bg orange/8, text orange |
| Unselected | border white/5, bg white/3, text white/25 |
| Tags list | Hiking, Museums, Street Food, Surfing, Photography, Markets, Diving, Wine, Architecture, Festivals, Yoga, Nightlife |
| Selected indices | 0 (Hiking), 2 (Street Food), 4 (Photography), 7 (Wine), 9 (Festivals) |
| Counter | "5 selected" 12px, white/15, centered, bottom 12px |
| Button | "Continue" |

### 4.5 Budget (Step 4)

**Glow:** none

| Element | Spec |
|---------|------|
| ProgressDots | step 4 |
| ScreenHeader | label: "Step 5", title: "Budget Style" |
| Layout | vertical center |
| Emoji | "⚖️" 48px, bottom 20px |
| Label | "Balanced" 24px bold white, bottom 6px |
| Sublabel | "Mix of budget-friendly and splurges" 14px, white/25, bottom 48px |
| Slider | SliderTrack, progress 60%, gradient orange→amber400, thumb border orange, shadow orange |
| Slider to labels | 16px |
| Range labels | "BACKPACKER" left / "LUXURY" right — 10px medium, tracking 1.5, white/15, UPPERCASE |
| Button | "Continue", top margin 24px |

### 4.6 Pace (Step 5)

**Glow:** none
Identical structure to Budget except:

| Difference | Value |
|------------|-------|
| Emoji | "🚶" |
| Label | "Super Chill" |
| Sublabel | "1-2 activities per day" |
| Slider progress | 25% |
| Slider gradient | blue→cyan |
| Slider thumb border | blue |
| Slider shadow | blue |
| Range labels | "SUPER CHILL" / "GO GO GO!" |

### 4.7 Notifications (Step 6)

**Glow:** none
**Layout:** vertical + horizontal center, text-center

| Element | Spec |
|---------|------|
| Emoji | "🔔" 48px, bottom 32px |
| Kicker | "STAY IN THE LOOP" 10px bold, tracking 2.5, orange/50 |
| Title | "Enable Notifications" 22px bold white, top 12px |
| Description | "Get notified when your crew votes, plans change, or it's time to pack." 14px, white/25, line-spacing 4px, top 12px, bottom 48px |
| Button | PrimaryButton "Enable Notifications" |
| "Maybe Later" | 14px medium, white/15, top 16px |
| ProgressDots | step 6, top margin 40px |

### 4.8 All Set (Step 7)

**Glow:** emerald
**Layout:** vertical + horizontal center, text-center

| Element | Spec |
|---------|------|
| Emoji | "✅" 48px, bottom 24px |
| Kicker | "YOU'RE READY" 10px bold, tracking 2.5, **emerald/60** (not orange) |
| Title | "All Set!" 22px bold white, bottom 28px |
| Summary (VStack gap 12px) | 3 PillRows (default, not highlighted): |
| | "⛰️" "Adventure, Culture, Nightlife" + green check |
| | "⚖️" "Balanced budget" + green check |
| | "🚶" "Super Chill pace" + green check |
| Summary to button | 32px |
| Button | PrimaryButton "Start Exploring" **gradient** (orange→amber), shadow orange/20 |
| ProgressDots | step 7, top margin 32px |

---

## 5. Feature Screens

All feature screens use px-20 horizontal padding.

### 5.1 Swipe to Vote

**Glow:** emerald

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Swipe to Vote", title: "Barcelona Trip", subtitle: "5 members" |
| Destination card | Full-width, radius 24px, border white/6, shadow black/40 |
| | Image area: height 224px, gradient TL→BR (emerald-700/40 → teal-600/25 → cyan-500/15) |
| | Overlay: gradient B→T (black/80 → transparent) |
| | Text (bottom-left, padding 20px): |
| | — "Barceloneta Beach" 22px bold white |
| | — MapPin icon 13px + "Beach · Free" 14px white/35, gap 6px |
| Card to buttons | 28px |
| Vote buttons | HStack gap 32px, centered |
| | Reject: 60px circle, border 2px red/25, bg red/5, X icon 22px red/80 |
| | Accept: 60px circle, border 2px emerald/25, bg emerald/5, heart.fill icon 22px emerald/80 |
| Buttons to match | 28px |
| Group Match bar | full-width, radius 16px, bg emerald/8, border emerald/15, py 14px |
| | Content: checkmark icon 13px bold + "Group Match: 4/5 agreed" 14px bold, emerald |

### 5.2 Group Vote Results

**Glow:** none

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Group Vote", title: "Results" |
| Results list (VStack gap 24px) | 4 items: |

Each result item:
- Name row: HStack — name 15px semibold white / votes 14px medium white/30
- Name to bar: 8px
- Progress bar: height 10px, bg white/5, capsule, colored fill (width = percentage)
- Bar to badge: 6px
- Badge (optional): 12px bold, colored text

| Result | Votes | % | Bar Color | Badge |
|--------|-------|---|-----------|-------|
| Hidden Speakeasy | 4/4 | 100% | emerald | "✓ Must Do" (emerald) |
| Rooftop Yoga | 3/4 | 75% | blue | "★ Group Pick" (blue) |
| Flamenco Show | 2/4 | 50% | orange | none |
| Tapas Tour | 2/4 | 50% | amber400 | none |

| Tiebreaker card | full-width, radius 16px, bg orange/8, border orange/20, padding 20px, text-center |
| | "⚡ Tiebreaker!" 14px bold orange |
| | "Flamenco Show vs Tapas Tour" 14px white/30 |
| | "👑 Tapas Tour wins!" 14px bold white |

### 5.3 Budget Lock

**Glow:** orange

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Budget", title: "Set Your Budget", subtitle: "Barcelona Trip · 4 members" |
| Member budgets (VStack gap 12px) | 4 PillRows with sub text and right content: |
| | "😎" "You" sub:"submitted budget" → "$500" 18px bold white + green check |
| | "👩" "Sarah" sub:"submitted budget" → "$400" + check |
| | "🧑" "Mike" sub:"submitted budget" → "$350" + check |
| | "👩‍🦰" "Jess" sub:"submitted budget" → "$450" + check |
| Members to alignment | 20px |
| Group Alignment card | radius 16px, bg orange/8, border orange/20, padding 20px |
| | Kicker: "✨ GROUP ALIGNMENT" 10px bold, tracking 2, orange/60 |
| | Amount: "$350" 32px bold white + "$1,400 total" 13px medium orange/60, baseline-aligned, gap 12px |
| | "per person target" 13px white/25 |
| | Progress bar: full-width, height 8px, bg white/6, gradient orange→amber400 (100% filled) |
| Card to breakdown | 16px |
| "SUGGESTED BREAKDOWN" | 10px bold, tracking 1.5, white/15, UPPERCASE |
| Breakdown items (VStack gap 8px) | Each: dot (8px circle) + label 13px white/30 + amount 13px medium white/50 |
| | orange dot — Stays — $560 |
| | orange dot — Food — $350 |
| | emerald dot — Activities — $280 |
| | blue dot — Transport — $210 |
| Breakdown to settlements | 12px |
| "SETTLEMENTS" | 10px bold, tracking 1.5, white/10, UPPERCASE |
| Settlement rows (VStack gap 4px) | |
| | "You owe Sarah" 13px white/30 → "$45" 13px medium red/70 |
| | "Jess owes Mike" 13px white/30 → "$20" 13px medium emerald/70 |

### 5.4 Smart Schedule

**Glow:** emerald

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Smart Schedule", title: "Optimizing..." |
| Insights (VStack gap 12px) | 3 PillRows (default): |
| | "☀️" "Beach day → Wednesday (sunny)" |
| | "🏛️" "Sagrada Familia at 9am (shorter lines)" |
| | "✈️" "Mike lands at 2pm (free afternoon first)" |
| Insights to card | 28px |
| Schedule card | radius 16px, bg emerald/8, border emerald/15, padding 20px |
| | Header: checkmark 12px bold + "Optimized Schedule Ready" 14px bold, emerald, bottom 16px |
| | Schedule items (VStack gap 12px): |
| | Each: time (12px mono, emerald/50, width 44px) + name (13px, white/60) + icon (14px) |
| | 9:00 — Sagrada Familia — ☀️ |
| | 12:30 — La Boqueria Market — ☀️ |
| | 2:00 — Pick up Mike ✈️ — ⛅ |
| | 4:00 — Gothic Quarter — ☀️ |

---

## 6. Trip Screens

### 6.1 Trip Setup

**Glow:** emerald
**Layout:** px-20

| Element | Spec |
|---------|------|
| ScreenHeader | label: "New Trip", title: "Trip Setup" |
| Details (VStack gap 16px) | 4 PillRows with green check: |
| | "📍" "Barcelona, Spain" |
| | "👥" "4 people" |
| | "📅" "5 days · June 12-16" |
| | "💰" "$$ · ~$1,700 budget" |
| Confirmation bar | full-width, radius 16px, bg emerald/8, border emerald/15, py 16px, top 24px |
| | checkmark 13px bold + "Trip Created!" 15px bold, emerald, centered |

### 6.2 Join Trip

**Glow:** none
**Layout:** px-24, vertical + horizontal center, text-center

| Element | Spec |
|---------|------|
| Emoji | "🎟️" 48px, bottom 32px |
| ScreenHeader | label: "Join a Trip", title: "Enter Invite Code", subtitle: "Enter the code your friend shared." |
| Code boxes | HStack gap 10px, 6 boxes |
| | Each: 44px wide × 52px tall, radius 12px, bg white/5, border white/5 |
| | Letter: 20px bold monospaced, white |
| | Letters: A B 3 X 7 K |
| Boxes to button | 32px |
| Button | PrimaryButton "Join Trip" **gradient**, shadow orange/15 |
| Footnote | "Codes are case-insensitive" 12px, white/12, top 12px |

### 6.3 Squad Itinerary

**Glow:** none
**Layout:** px-20

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Squad Itinerary", title: "Barcelona Trip", subtitle: "Day 1" |
| Day tabs | HStack gap 10px |
| | Active (Day 1): bg orange/12, text orange, border orange/20, radius 12px, px 20px, py 10px, 13px bold |
| | Inactive (Day 2, 3): bg white/3, text white/20, border white/3, same sizing |
| Tabs to items | 28px |
| Itinerary items (VStack gap 16px) | 3 items, each: |
| | Container: radius 16px, border white/5, padding 16px, HStack gap 16px |
| | Icon box: 48x48px, radius 12px, bg white/4, emoji 22px centered |
| | Text column (VStack leading): |
| | — Period: UPPERCASE, 10px bold, tracking 1.5, colored (varies) |
| | — Name: 15px bold white |
| | — "Added by {name}" 12px white/20 |
| | Drag handle: line.3.horizontal icon 14px, white/10 |

| Item | Emoji | Period | Period Color | Name | By | Background |
|------|-------|--------|-------------|------|-----|------------|
| 1 | 🍊 | MORNING | orange/60 | La Boqueria Ma... | Jess | amber/6 |
| 2 | 🏛️ | AFTERNOON | amber400/60 | Gothic Quarter ... | Marco | white/3 |
| 3 | 🍸 | EVENING | red/60 | Hidden Rooftop ... | Jess | purple/4 |

| Footer | "Drag to reorder · Tap to edit" 12px, white/10, centered, top 20px |

### 6.4 Members & Invite

**Glow:** none
**Layout:** px-20

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Barcelona Trip", title: "Members", subtitle: "5 members" |
| Invite card | radius 16px, bg white/4, border white/4, padding 20px, text-center |
| | "Share this code to invite friends" 12px, white/20, bottom 12px |
| | Code: "AB3X7K" 26px bold monospaced, white, tracking 8px, bottom 20px |
| | Action buttons: HStack gap 12px |
| | Copy: bg white/5, border white/5, radius 12px, py 12px. doc.on.doc icon 14px + "Copy" 13px medium, white/60 |
| | Share: bg orange/10, border orange/20, radius 12px, py 12px. square.and.arrow.up icon 14px + "Share" 13px medium, orange |
| Card to members | 24px |
| Member list | VStack, divided by 1px white/3 lines |

Each member row:
- HStack gap 14px, vertical padding 14px
- Avatar: 40px circle, bg white/5
  - Status dot: 12px circle, positioned bottom-right, border 2px #0A0A0A
  - Online: emerald fill
  - Offline: white/12 fill
- Name: 14px medium, white/80
- Role badge (if owner): "Owner" 10px bold, orange text, capsule bg orange/10, px 10px, py 4px

| Member | Role | Online |
|--------|------|--------|
| Alex (You) | Owner | Yes |
| Sarah | — | Yes |
| Mike | — | No |
| Jess | — | Yes |
| Marco | — | No |

---

## 7. Profile Screens

### 7.1 Profile

**Glow:** none
**Layout:** px-20

| Element | Spec |
|---------|------|
| Header row | HStack: "PROFILE" 10px bold tracking 2.5 orange/50 ← → gearshape icon 18px white/15 |
| Header to avatar | 20px |
| Avatar section | Center-aligned VStack |
| | Avatar: 80px circle, bg white/5, border 2.5px orange/35 |
| | Trophy badge: 28px circle, gradient TL→BR orange→amber600, positioned bottom-right offset (4,4), trophy.fill 12px white, shadow orange/25 |
| | Name: "Alex Chen" 18px bold white, top 12px |
| | Handle: "@alexplores" 14px white/20 |
| Avatar to rank card | 20px |
| Rank card | radius 16px, bg orange/8, border orange/20, padding 16px |
| | Row 1: "🏆" 20px + "Gold" 14px bold white + "5,240 XP" 12px white/20 ← → "Roadmap" 12px white/15 + chevron.right 10px |
| | Progress bar: height 8px, bg white/6, gradient orange→amber400 fill at 52% |
| | "4,760 XP to Diamond · 52%" 10px, white/12, top 6px |
| Card to stats | 16px |
| Stats grid | 4 columns, gap 8px |
| | Each cell: radius 12px, bg white/3, border white/3, padding vertical 10px |
| | Icon: 14px emoji, bottom 4px |
| | Value: 18px bold white |
| | Label: 9px medium, white/12, top 2px |

| Stat | Icon | Value | Label |
|------|------|-------|-------|
| 1 | ✓ | 23 | Done |
| 2 | 🌍 | 7 | Countries |
| 3 | ✈️ | 5 | Trips |
| 4 | 👥 | 142 | Followers |

| Stats to achievements | 12px |
| Achievements header | HStack: "🏅" 14px + "Achievements" 12px bold white/70 + spacer + "5/9" 12px white/12 |
| Header to badges | 12px |
| Badge row | HStack gap 10px |
| | Unlocked (5): 36px circle, bg orange/8, border orange/15, emoji 16px |
| | Emojis: 🥾 ⚡ 🧭 🏔️ 🌟 |
| | Locked (4): 36px circle, bg white/2, border white/2, "🔒" 16px, opacity 20% |

### 7.2 Rank Roadmap

**Glow:** amber
**Layout:** px-20

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Rank System", title: "Roadmap" |
| Ranks list (VStack gap 12px) | 6 items |

Each rank row:
- Container: radius 16px, padding 14px, HStack gap 14px
- Background and border: rank-specific (see table)
- Locked ranks: opacity 35%
- Icon: 44px circle, same bg as container, emoji 18px (🏆 if unlocked, 🔒 if locked)
- Text column:
  - Name: 14px bold, rank-specific color
  - CURRENT badge (Gold only): 8px bold, tracking 1.2, orange text, capsule bg orange/10, px 8px, py 2px
  - XP: 12px, white/12
  - Progress bar (Gold only): height 6px, bg white/6, gradient orange→amber400 at 52%

| Rank | XP | Text Color | BG | Border | Unlocked | Current |
|------|----|------------|-----|--------|----------|---------|
| Iron | 0 XP | white/25 | white/3 | white/3 | Yes | No |
| Bronze | 1,000 XP | #92400E | #78350F/6 | #78350F/15 | Yes | No |
| Silver | 2,500 XP | #D1D5DB | #6B7280/6 | #6B7280/15 | Yes | No |
| Gold | 5,000 XP | #FBBF24 | #F59E0B/6 | #F59E0B/15 | Yes | **Yes** |
| Diamond | 10,000 XP | #22D3EE | #06B6D4/6 | #06B6D4/10 | No | No |
| Obsidian | 25,000 XP | #A78BFA | #8B5CF6/6 | #8B5CF6/10 | No | No |

### 7.3 Settings

**Glow:** none
**Layout:** px-20

| Element | Spec |
|---------|------|
| ScreenHeader | label: "Settings", title: "Preferences" |
| "ACCOUNT" | 10px bold, tracking 2, white/12, bottom 12px |
| Account rows | 3 SettingsRows |
| "SUPPORT" | 10px bold, tracking 2, white/12, top 28px, bottom 12px |
| Support rows | 3 SettingsRows |
| Sign Out | pinned to bottom: rectangle.portrait.and.arrow.right 16px + "Sign Out" 14px bold, red/70, gap 16px |

SettingsRow component:
- HStack gap 16px, vertical padding 16px
- Icon: SF Symbol 16px, white/15
- Label: 14px medium, white/70
- Chevron: chevron.right 12px, white/8
- Bottom border: 1px white/3

| Section | Icon (SF Symbol) | Label |
|---------|-----------------|-------|
| Account | person | Edit Profile |
| Account | star | Preferences |
| Account | bell | Notifications |
| Support | questionmark.circle | Help Center |
| Support | shield | Privacy Policy |
| Support | checkmark.circle | Terms of Service |

---

## 8. Screen Map & Navigation

### 8.1 All 22 Screens by Section

```
AUTH (3 screens)
├── SignIn
├── SignUp
└── ResetPassword

ONBOARDING (8 screens)
├── Welcome         (step 0)
├── TripIntent      (step 1)
├── TravelStyle     (step 2)
├── Interests       (step 3)
├── Budget          (step 4)
├── Pace            (step 5)
├── Notifications   (step 6)
└── AllSet          (step 7)

FEATURES (4 screens)
├── SwipeToVote
├── GroupVoteResults
├── BudgetLock
└── SmartSchedule

TRIPS (4 screens)
├── TripSetup
├── JoinTrip
├── SquadItinerary
└── MembersInvite

PROFILE (3 screens)
├── Profile
├── RankRoadmap
└── Settings
```

### 8.2 Suggested Navigation Flow

```
App Launch
  → Auth (SignIn / SignUp / ResetPassword)
  → Onboarding (Welcome → TripIntent → TravelStyle → Interests → Budget → Pace → Notifications → AllSet)
  → Main App
      ├── Tab: Explore (SwipeToVote → GroupVoteResults)
      ├── Tab: Trips (TripSetup / JoinTrip → SquadItinerary → MembersInvite → BudgetLock → SmartSchedule)
      └── Tab: Profile (Profile → RankRoadmap / Settings)
```

### 8.3 File Reference

| File | Contents | Lines |
|------|----------|-------|
| `SideQuestDesignSystem.swift` | Color system, font helpers, all shared components | ~310 |
| `AuthScreens.swift` | SignIn, SignUp, ResetPassword, SocialButton helper | ~207 |
| `OnboardingScreens.swift` | 8 onboarding views, FlowLayout | ~482 |
| `FeatureScreens.swift` | SwipeToVote, VoteResults, BudgetLock, SmartSchedule | ~438 |
| `TripScreens.swift` | TripSetup, JoinTrip, SquadItinerary, MembersInvite | ~353 |
| `ProfileScreens.swift` | Profile, RankRoadmap, Settings, SettingsRow | ~413 |

### 8.4 How to Use This Spec

1. **For building in Xcode:** Copy the SwiftUI files from this folder directly into your project. Add Outfit + Inter fonts to your app bundle if you want web parity; otherwise the system font (SF Pro) is used.

2. **For AI code generation:** Provide this spec document as context. It contains every hex value, pixel measurement, opacity, gradient, spacing, and layout rule. The AI can cross-reference this spec with the SwiftUI source files for complete accuracy.

3. **For design handoff:** Share this document with designers or developers. Every value is extracted directly from the production React code — nothing is approximated.
