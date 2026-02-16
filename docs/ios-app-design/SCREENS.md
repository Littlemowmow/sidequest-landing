# SideQuest iOS App — Every Screen & What It Does

> This document describes every screen in the app, what's on it, and why. Design the UI however you want — this is just the functional spec. Make it look incredible.

## App Flow

```
Sign In / Sign Up
    ↓
Onboarding (8 steps — only on first launch)
    ↓
Main App (3 tabs: Discover, Trips, Profile)
```

---

## AUTH SCREENS

### Sign In
- Email input
- Password input
- "Forgot password?" link → opens Reset Password screen
- Sign In button
- Apple Sign In button
- Google Sign In button (placeholder)
- "Don't have an account? Sign Up" toggle at bottom
- **Purpose**: Get returning users back in fast

### Sign Up
- Email input
- Password input
- Confirm password input
- Sign Up button
- Apple Sign In button
- Google Sign In button (placeholder)
- "Already have an account? Sign In" toggle at bottom
- **Purpose**: New user registration

### Reset Password
- Email input
- "Send Reset Link" button
- Success message after submission
- **Purpose**: Self-service password recovery

---

## ONBOARDING (8 steps, shown once after first sign up)

**Why it exists**: We need to know the user's travel style, interests, and budget to personalize their experience. Also primes them to understand what the app does.

### Step 1: Welcome
- App logo/branding
- Tagline: "Discover hidden gems, plan epic trips, and travel like a local — not a tourist."
- Continue button
- **Purpose**: First impression, set the tone

### Step 2: Trip Intent
- "What brings you here?"
- Selection cards with icons — user picks one
- Options are things like: planning a specific trip, exploring ideas, finding travel buddies, etc.
- **Purpose**: Know their immediate goal so we can route them to the right experience

### Step 3: Travel Style
- "What's your travel style?"
- Grid of style cards (2 columns) — multi-select
- Things like: Adventure, Culture, Foodie, Relaxation, Nightlife, Nature, etc.
- **Purpose**: Personalize activity recommendations

### Step 4: Interests
- "What interests you?" (select at least 3)
- Grid of interest chips (3 columns) — multi-select
- More specific than travel style — hiking, museums, street food, surfing, photography, etc.
- **Purpose**: Fine-tune discovery feed

### Step 5: Budget
- "What's your budget style?"
- Slider from 1-5
- Labels: Budget Backpacker → Balanced → Luxury Explorer
- Shows emoji + label that updates as you slide
- **Purpose**: Filter activities and trips by price range

### Step 6: Pace
- "How do you like to travel?"
- Slider from 1-5
- Labels: Super Chill (1-2 activities/day) → Go Go Go! (pack everything in)
- Shows emoji + label + description that updates as you slide
- **Purpose**: Customize itinerary density

### Step 7: Notifications
- "Stay in the loop"
- "Enable Notifications" button
- "Maybe Later" skip option
- **Purpose**: Push notification permission prompt

### Step 8: All Set
- Success checkmark
- Summary card showing their choices (travel style, budget, pace)
- "Start Exploring" button → goes to main app
- **Purpose**: Confirmation + let them review before starting

---

## MAIN APP — 3 TABS

### Floating Tab Bar (bottom navigation)
- **Discover** (star icon) — Browse activities
- **Trips** (map icon) — Manage group trips
- **Profile** (person icon) — Your profile, stats, achievements
- Pill/capsule shaped, floating above bottom edge

---

## TAB 1: DISCOVER

### Discovery Feed
- **Greeting header**: "Hi, [Name] 👋" with weather widget showing current temp
- **Filter chips** (horizontal scroll): Hiking, Food, Drinks, Sights, SideQuests — tap to filter the feed
- **Hero card** (large, featured): Big image with gradient overlay, country flag, activity name, short description, metadata pills (duration, location, score), "Save Activity" button
- **"Popular" section**: Title + "See All" link
- **Activity cards list**: Scrollable feed of activity cards
- **Purpose**: The main discovery engine — users browse and save activities they want to do

### Activity Browse Card (repeated in the feed)
- Image with experience tag badge (top-left: "SideQuest ⚡", "Local Pick 📍", or "Must See 🏛")
- Bookmark/save button (top-right)
- Country flag + code
- Activity name
- Duration, price range, score pills
- Arrow button to view details
- **Purpose**: Quick-scan card for browsing

### Activity Detail View (tap into an activity)
- **Hero image** (large, top) with gradient overlay
- Back button + weather widget in top bar
- Score badge (X/100)
- Activity name (large)
- Country flag + code
- Detail pills: duration, price, type
- Full description text
- Tags (horizontal scroll)
- **"Save" button** — saves to your profile
- **"Add to Trip" button** — opens trip picker to propose this activity to a group trip
- **Purpose**: Full info about an activity + actions to save or propose to a trip

### Trip Picker Sheet (after tapping "Add to Trip")
- "Choose Trip" header
- List of user's trips that match the activity's city
- Each row: trip image, title, destination
- Tap a trip → proposes the activity to that trip
- **Purpose**: Quick way to add discovered activities to group trips

### Propose Toast (confirmation)
- Small toast notification above tab bar
- Checkmark + activity name + "Propose to Trip" button
- Dismiss X button
- **Purpose**: Confirm activity was proposed, with quick action

---

## TAB 2: TRIPS

### Trips List
- **Header**: "Trips" title + Join Trip button (ticket icon) + Create Trip button (plus icon)
- **Trip cards list** or **Empty state** ("No trips yet" with "Create Trip" action)
- **Purpose**: Central hub for all group trips

### Trip Card (repeated in the list)
- Cover image
- Country badge (top-left)
- Star/favorite icon (top-right)
- Trip title
- Calendar dates + destination metadata
- Member avatar stack (overlapping circles, up to 3 shown + "+N" overflow)
- Arrow button to view details
- **Purpose**: Quick-scan card for each trip

### Create Trip (sheet)
- Trip name input
- Destination input
- Start date picker
- End date picker
- Group trip toggle
- Trip mode selector (Planning / Active / Reflection / Completed)
- "Create Trip" button
- **Purpose**: Create a new group trip

### Join Trip (sheet)
- Ticket icon
- "Enter invite code" header
- Large monospaced code input (case-insensitive)
- "Join Trip" button
- Help text explaining how invite codes work
- **Purpose**: Join someone else's trip via share code

### Trip Detail View
- **Hero header**: Cover image with gradient overlay, trip mode badge (color-coded: Planning=blue, Active=green, Reflection=sunset, Completed=green), trip title, destinations + dates, member avatar preview
- **3 tabs below header**: Itinerary, Activities, Members

#### Trip Tab: Itinerary
- **Empty state** (no itinerary yet):
  - "Generate Your Itinerary" title
  - Explanation that AI can build one for you
  - "Generate with AI" button → opens AI options sheet
  - "Or create manually" button
  - **Purpose**: Get users to generate their first itinerary

- **AI Generation Options Sheet**:
  - "AI Itinerary Generator" header with sparkles icon
  - "Group Favorites Only" toggle — only use activities the group voted on
  - "Unanimous Picks" toggle — prioritize activities everyone agreed on
  - "Activity Mix" slider — popular tourist spots ↔ hidden gems (SideQuests)
  - Vote legend explaining badge colors (Must Do, Group Favorite, Mixed, Debated)
  - "Generate Itinerary" button
  - **Purpose**: Let users customize how the AI builds their schedule

- **Itinerary view** (after generation):
  - **Day selector** (horizontal scroll of day pills): Day 1, Day 2, Day 3... Selected day highlighted. Dot indicator on days that have activities.
  - **Day header**: "Day X" + date
  - **"Add activity" button** (outline style)
  - **Time slot sections** for each day:
    - Morning (sunrise icon, gold) — time range shown
    - Afternoon (sun icon, sunset color)
    - Evening (sunset icon, dark)
    - Night (moon icon, dark)
  - Each time slot shows:
    - Activity cards (image, name, duration, cost, vote count) OR
    - Empty slot card with dashed border ("No activities yet")
    - "Add another activity" button
  - **Trip summary card** at bottom: Duration, Total Cost, Location
  - **Purpose**: Day-by-day visual schedule that the group collaborates on

- **Activity card in itinerary** (within time slots):
  - Small image thumbnail
  - Activity name
  - Duration + cost
  - Vote indicator (thumbs up + count if votes > 0)
  - Menu button (three dots) with options: Move to [Morning/Afternoon/Evening/Night], Remove
  - **Purpose**: See what's planned + manage the schedule

#### Trip Tab: Activities
- **Header**: "Proposed Activities (N)" + menu with "Propose Custom" and "From Saved" options
- **Sort options**: Top Voted / Recent
- **Proposed activity cards list**:
  - Thumbnail image
  - Category tag (colored text)
  - "Custom" badge if user-created (not from discovery)
  - Activity name
  - "Proposed by [Name]" caption
  - Vote buttons (up/down with counts)
- **Empty state**: "No activities proposed yet" with suggest/discover actions
- **Purpose**: Democratic activity selection — everyone proposes and votes

#### Vote Buttons (on each proposed activity)
- Upvote button (arrow up) — turns green when selected
- Downvote button (arrow down) — turns red when selected
- Vote counts next to each
- Disabled state while vote is processing
- **Purpose**: Anonymous group voting on what to do. Majority wins.

#### Trip Tab: Members
- **Invite section**:
  - Invite icon + explanatory text
  - Large trip code display (monospaced font)
  - "Copy Code" button
  - "Share Link" button (opens iOS share sheet)
  - Help text: "Share this code with friends to invite them"
- **Members list**:
  - Avatar + name
  - Role badge ("Owner" for trip creator)
  - Online status indicator (green/gray dot)
- **Purpose**: See who's in the trip + invite more people

### Invite Sheet (share modal)
- Airplane icon
- "Invite friends to [trip name]"
- Large trip code (monospaced)
- Copy Code button
- Share Link button
- Help text
- **Purpose**: Dedicated sharing flow for trip invitations

### Propose Activity Sheet (custom activity)
- Activity name input (required)
- Description input (optional)
- Category picker buttons (Do, See, Eat, Drink, Discover)
- Neighborhood input (optional)
- City display (read-only, inherited from trip)
- "Propose Activity" button
- Error message display
- **Purpose**: Add custom activities that aren't in the discovery feed

### Edit Trip (sheet)
- Same fields as Create Trip, pre-filled
- "Save Changes" button
- **Purpose**: Edit trip details after creation

---

## TAB 3: PROFILE

### Profile View
- **Header**:
  - Large avatar with colored ring (ring color = rank color)
  - Rank badge icon (positioned on avatar)
  - Display name + @username
  - Verification badge (if high rank)

- **Rank card** (tappable → opens Rank Roadmap):
  - Current rank icon + rank name + XP count
  - "Roadmap" label with chevron (indicates it's tappable)
  - XP progress bar (gradient fill showing progress to next rank)
  - "X XP to next rank" text + percentage
  - **Purpose**: Gamification — show progress and motivate engagement

- **Stats grid** (4 columns):
  - Activities completed (checkmark icon)
  - Countries visited (globe icon)
  - Trips taken (airplane icon)
  - Followers (people icon)
  - **Purpose**: Quick snapshot of user's travel stats

- **Achievement badges** section:
  - "Achievements" header with trophy icon + "X/Y" count
  - Horizontal scroll of badge icons
  - Earned badges: full color with colored border
  - Locked badges: dimmed with lock overlay
  - 9 total badges: First Steps, Sidequest Seeker, Explorer, Adventurer, Legend, Globetrotter, World Traveler, Rising Star, Superstar
  - **Purpose**: Gamification — collectible badges for milestones

- **Content tabs** (3 sub-tabs):
  - **Saved**: Grid/list of saved activities from discovery
  - **Completed**: Activities with checkmark overlay + XP reward badge showing how much XP they earned
  - **Stamps**: Passport-style grid of country stamps
    - Flag emoji + country code
    - Dashed border
    - Verification indicator (self-reported vs photo-verified vs GPS-verified)
  - **Purpose**: Personal travel portfolio + progress tracking

### Rank System (gamification backbone)

| Rank | XP Required | Perks |
|------|------------|-------|
| Iron | 0 | Basic access |
| Bronze | 1,000 | Unlock badges display |
| Silver | 2,500 | Custom profile themes |
| Gold | 5,000 | Priority in group matching |
| Diamond | 10,000 | Verification badge, exclusive content |
| Obsidian | 25,000 | All perks, legendary status |

**How to earn XP:**
- Complete a trip: +50 XP
- Create itinerary: +25 XP
- Save itinerary: +10 XP
- Like activity: +5 XP
- Remix itinerary: +15 XP
- Collaborate on trip: +20 XP

### Level Up Animation (overlay when you rank up)
- Dimmed background
- Confetti particle effect
- Rank icon with radial glow
- "RANK UP!" badge
- New rank name + congratulations text
- Unlocked perks list (what you just earned)
- Continue button
- **Purpose**: Celebration moment — makes ranking up feel rewarding

### Rank Roadmap (sheet, tapped from rank card)
- Trophy icon + "Adventurer Rank Roadmap" header
- All 6 ranks listed top to bottom
- Each rank card shows:
  - Rank icon (colored circle, locked ranks show lock overlay)
  - Rank name + "CURRENT" badge if applicable
  - XP range required
  - Progress bar (current rank only)
  - Perks list (checkmarks if unlocked)
- "How to Earn XP" section at bottom with XP values
- **Purpose**: Show the full progression path and motivate users to keep going

### Settings (sheet from profile)
- **Account section**: Edit Profile, Preferences, Notifications
- **Support section**: Help Center, Privacy Policy, Terms of Service
- **Sign Out** button (destructive/red style)
- **Purpose**: Standard settings

---

## DATA MODELS (what Replit needs to know about)

### User Profile
- name, username, email, avatar image
- travel preferences (styles, interests, budget level 1-5, pace level 1-5)
- stats (trips completed, activities done, countries visited, XP)
- rank (calculated from XP)

### Activity
- name, description, city, country, location (lat/lng)
- images array, tags array
- cost range (min/max + currency), duration (minutes)
- difficulty, seasonality, best months
- is it a SideQuest (hidden gem)? SideQuest score, rating
- experience tag: "SideQuest", "Local Pick", or "Tourist Essential"

### Trip
- title, destinations array, start/end dates
- budget, currency, cover image
- status, mode (Planning/Active/Reflection/Completed)
- invite code (for sharing), is public
- owner + members list

### Itinerary
- title, destination, duration in days
- total cost, cover image
- is public, SideQuest count, remix count
- based on another itinerary (for remixes)

### Itinerary Day
- day number, date, title, weather icon, notes
- has activities in time slots (morning/afternoon/evening/night)

### Activity Vote (for group decision making)
- which trip, which activity, who proposed it
- upvote user IDs array, downvote user IDs array
- is it a "must do"? who marked it as must do?

### Achievement Badge
- name, description, icon
- requirement type (activities completed, countries visited, XP earned, etc.)
- requirement threshold
- earned or locked state

---

## KEY FUNCTIONAL CONCEPTS

### The Discovery → Trip Pipeline
1. User browses activities in Discovery tab
2. Saves ones they like (bookmark)
3. Proposes activities to a specific group trip ("Add to Trip")
4. Group members vote on proposed activities (up/down)
5. Top-voted activities get added to the itinerary
6. AI can auto-generate an optimized schedule from voted activities

### Anonymous Group Voting
- Everyone votes independently — no one sees who voted what until results are in
- Upvote = want to do it, Downvote = pass
- Activities are ranked by net votes
- "Must Do" flag for unanimous picks
- This prevents the loudest person from dominating trip planning

### SideQuests (the namesake feature)
- Hidden gems and local experiences not in guidebooks
- Marked with a ⚡ "SideQuest" badge and a SideQuest score
- Mixed into the discovery feed alongside tourist essentials
- The slider in AI itinerary generation controls the ratio of tourist spots vs SideQuests

### Gamification
- Everything earns XP (completing trips, voting, creating itineraries, etc.)
- XP → Rank progression (Iron through Obsidian)
- Each rank unlocks perks
- Achievement badges for milestones
- Country passport stamps as collectibles
- Level-up animation when you rank up
- **Purpose**: Keep users engaged and coming back. Make travel planning feel like a game.

### Invite System
- Each trip has a unique invite code
- Share via copy or iOS share sheet
- Anyone with the code can join the trip
- Case-insensitive entry
