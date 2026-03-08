# AI Tarot Divination Web App - Implementation Plan

## Project Overview
Single-page HTML/CSS/JavaScript app with deep purple + gold theme, starry sky background, 3D card flip animations, and AI interpretation placeholder for DeepSeek/OpenAI integration.

---

## Architecture Overview

### Core Components
1. **Semantic HTML Structure** - Clean markup for accessibility
2. **CSS 3D Transforms** - Perspective-based card flip animations
3. **JavaScript Logic** - Card shuffling, event handling, API integration
4. **Responsive Grid** - Mobile-first layout system

### Technology Decisions
- **No External Dependencies** - Vanilla HTML/CSS/JS only
- **CSS-Only Animations** - Efficient starry sky (no heavy JS animation libraries)
- **3D Perspective Rendering** - CSS `perspective`, `transform-style: preserve-3d`, `backface-visibility`
- **Random Card Selection** - Fisher-Yates shuffle from 22 Major Arcana deck
- **Graceful Degradation** - Respects `prefers-reduced-motion` for accessibility

---

## Phase 1: Project Setup ✅

### 1.1 Create index.html
**Purpose**: Semantic HTML structure with card templates and form inputs

**Structure**:
- `<!DOCTYPE html>` with proper meta tags (charset, viewport)
- Fixed starry sky background container
- Main `.container` with flex layout
- Header section (title, tagline)
- Input section (textarea, button, error message)
- Cards section (3 card structures with back/front faces)
- Interpretation section (hidden, revealed after flip)
- Reset button (hidden, revealed after reading)

**Key Elements**:
```html
<div class="card">
  <div class="card-inner">
    <div class="card-back"><!-- Gold texture --></div>
    <div class="card-front"><!-- Card details --></div>
  </div>
</div>
```

### 1.2 Create styles.css
**Purpose**: Theme colors, animations, responsive layout, 3D setup

**Key Features**:
- CSS variables for theme (purple, gold, sizing)
- Starry sky animation (radial gradients, keyframes)
- 3D card styling (perspective, preserve-3d, backface-visibility)
- Mobile-first responsive breakpoints (480px, 768px, 1200px+)
- Accessibility (focus states, reduced-motion)

**Color Palette**:
- Primary dark: `#1a0033` (deep purple)
- Accent gold: `#d4af37` (standard gold)
- Accent light gold: `#f4d03f` (brighter gold)
- Text light: `#ffffff` (high contrast)

### 1.3 Create script.js
**Purpose**: Card deck, event handling, animation logic, API placeholder

**Core Modules**:
- Major Arcana deck array (22 cards with name, symbol, description)
- DOM element references
- State management (selectedCards, isAnimating)
- Event listeners (click handlers, keyboard support)

---

## Phase 2: Visual Design & Layout ✅

### 2.1 Hero Section
- Centered title with gold text shadow glow effect
- Mystical subtitle/tagline
- Fade-in animation on page load

### 2.2 Input Section
- Text area with placeholder
- "Start Divination" button with gold gradient background
- Error message display area
- Submit on Enter key (Shift+Enter for new line)

### 2.3 Card Grid Layout
- **Desktop (1024px+)**: 3 cards in horizontal row
- **Tablet (768px)**: 3 cards with adjusted sizing
- **Mobile (480px)**: Cards stack responsively with adjusted dimensions
- Centered container with gap between cards
- `perspective: 1000px` for 3D effect

### 2.4 Card Visual Design
**Back Face**:
- Gold gradient: linear-gradient(135deg, #d4af37, #e5c158, #c9a227)
- Subtle texture pattern (diagonal lines, 45° patterns)
- "Tarot" text centered
- Box shadow for depth

**Front Face**:
- Dark purple gradient background
- Gold border (2px solid)
- Unicode symbol (large, 3rem)
- Card name (gold text, 1.3rem)
- Description (muted text, 0.9rem)
- Centered flex layout

### 2.5 AI Interpretation Section
- Card-like appearance (consistent with design)
- Shows selected cards list
- Placeholder text before API response
- Loading spinner during generation
- "Powered by AI divination" footer

### 2.6 Reset Button
- Secondary style (outline, not filled)
- Hidden until reading is complete
- Allows user to start new divination

---

## Phase 3: Core Animation ✅

### 3.1 CSS 3D Flip Setup
```css
.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-back, .card-front {
  backface-visibility: hidden;
}

.card-front {
  transform: rotateY(180deg);
}
```

**Key Properties**:
- **perspective: 1000px** - Depth perception for 3D effect
- **transform-style: preserve-3d** - Allow 3D transforms on children
- **backface-visibility: hidden** - Hide face when rotated away
- **rotateY(180deg)** - 180° rotation around Y-axis
- **Easing**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` for bouncy feel
- **Duration**: 0.6s for smooth animation

### 3.2 Sequential Flip Timing
```javascript
const flipDelays = [0, 400, 800]; // milliseconds
// Card 1: 0ms
// Card 2: 400ms delay
// Card 3: 800ms delay
// Total: ~1.4 seconds (800ms + 600ms animation duration)
```

Each card flips independently with staggered delays for dramatic effect.

### 3.3 Animation Polish
- Starry sky has subtle twinkle effect (0.8 to 1.0 opacity)
- Fade-in animations for sections on page load
- Smooth button hover/active states
- Loading spinner rotation (continuous 360°)

---

## Phase 4: JavaScript Logic ✅

### 4.1 Major Arcana Deck
```javascript
const majorArcana = [
  {
    name: "The Fool",
    symbol: "✨",
    description: "New beginnings, taking risks, innocence"
  },
  // ... 21 more cards (total 22)
]
```

**Card Data Structure**:
- `name`: Full card name (e.g., "The Fool")
- `symbol`: Unicode emoji/symbol (e.g., "✨")
- `description`: 1-2 line interpretation summary

**Deck Coverage**: All 22 Major Arcana cards from The Fool (0) to The World (XXI)

### 4.2 Input Validation
```javascript
function validateQuestion() {
  const question = questionInput.value.trim();
  
  if (question.length === 0) {
    showError('Please ask a question before starting the divination.');
    return false;
  }
  
  if (question.length < 5) {
    showError('Please ask a more detailed question.');
    return false;
  }
  
  return true;
}
```

**Validation Rules**:
- Non-empty input required
- Minimum 5 characters for substantive question
- Clear error messages displayed
- Input disabled during animation

### 4.3 Card Shuffle Logic
```javascript
function shuffleDeck() {
  const deck = [...majorArcana];
  const selected = [];
  
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    selected.push(deck[randomIndex]);
    deck.splice(randomIndex, 1); // Remove selected card
  }
  
  return selected;
}
```

**Algorithm**: Fisher-Yates-style shuffle
- Prevents duplicate cards in single reading
- True random selection (each card has equal probability)
- Returns 3 unique cards

### 4.4 Divination Flow
1. User enters question
2. Click "Start Divination" button
3. Validation check (non-empty, min length)
4. Button disabled, input locked
5. **Shuffle and select 3 random cards**
6. Populate card front faces with selected cards
7. **Trigger sequential flips**:
   - Card 1: Flip at 0ms
   - Card 2: Flip at 400ms
   - Card 3: Flip at 800ms
8. **Show AI interpretation section** after final flip completes (~1600ms total)
9. Display cards drawn list
10. Load AI reading (placeholder/real API)
11. Show reset button

### 4.5 State Management
```javascript
let selectedCards = [];    // Current divination cards
let isAnimating = false;   // Prevent duplicate clicks during animation
```

**Flow**:
- Set `isAnimating = true` when divination starts
- Disable button and input
- Set `isAnimating = false` after final flip + reading display
- Re-enable button and input (or reset)

### 4.6 Event Listeners
- **Click**: "Start Divination" button → `startDivination()`
- **Click**: "New Reading" button → `resetDivination()`
- **Input**: Question textarea → `clearErrorMessage()` (clear previous errors)
- **Keypress**: Shift+Enter skips submission, Enter submits (if not animating)

---

## Phase 5: AI & API Integration ✅

### 5.1 API Placeholder Structure
Located in `generateAIReading()` function with detailed comments:

**Sections**:
1. **Integration Guide** - Header with steps and best practices
2. **Prompt Construction** - Format user question + card info for AI
3. **API Configuration** - Choose between OpenAI or DeepSeek
4. **Request Body** - Properly formatted API request
5. **Headers** - Authorization and content-type
6. **API Call** - Fetch request (commented, ready to uncomment)
7. **Response Handling** - Extract and display AI reading
8. **Error Handling** - Catch and display errors gracefully

### 5.2 OpenAI Integration Setup
```javascript
// const apiKey = 'YOUR_OPENAI_API_KEY';
// const endpoint = 'https://api.openai.com/v1/chat/completions';
// const requestBody = {
//   model: 'gpt-4',
//   messages: [
//     {
//       role: 'system',
//       content: 'You are a mystical tarot reader...'
//     },
//     {
//       role: 'user',
//       content: prompt
//     }
//   ],
//   max_tokens: 300,
//   temperature: 0.9
// };
```

**Setup Steps**:
1. Get API key from https://platform.openai.com/api-keys
2. Replace `YOUR_OPENAI_API_KEY` with actual key
3. Uncomment the API call code
4. Test with a question

### 5.3 DeepSeek Integration Setup
```javascript
// const apiKey = 'YOUR_DEEPSEEK_API_KEY';
// const endpoint = 'https://api.deepseek.com/v1/chat/completions';
// const requestBody = {
//   model: 'deepseek-chat',
//   messages: [...],
//   max_tokens: 300,
//   temperature: 0.9
// };
```

**Setup Steps**:
1. Get API key from https://platform.deepseek.com/api-keys
2. Replace `YOUR_DEEPSEEK_API_KEY` with actual key
3. Uncomment the DeepSeek endpoint code
4. Test with a question

### 5.4 Security Best Practices
- **Never commit API keys** to version control
- **Use environment variables** in production (e.g., `process.env.OPENAI_API_KEY`)
- **Consider backend proxy** - Don't expose API keys in frontend code
- **Add request validation** - Check response status before parsing

### 5.5 Demo Reading Generator
```javascript
function generateDemoReading() {
  const templates = [
    // 4 different template structures
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}
```

**Purpose**: 
- Allows testing without real API
- Shows how cards integrate into narrative
- Provides fallback for API failures
- Removes lines once API is active

---

## Phase 6: Polish & Testing ✅

### 6.1 Responsive Testing
**Viewport Sizes**:
- **Mobile**: 320px, 375px, 480px
- **Tablet**: 600px, 768px
- **Desktop**: 1024px, 1440px, 1920px

**Verification**:
- Cards display correctly on all sizes
- Text remains readable
- No horizontal scroll
- Touch targets are adequate (48px+ for buttons)
- Images/textures scale appropriately

### 6.2 Animation Performance
- Use browser DevTools Performance tab
- Check for 60fps consistency
- No jank during card flips
- Smooth starry sky twinkling
- Efficient CSS animations (GPU-accelerated)

### 6.3 Accessibility Audit
- ✅ All buttons have `aria-label`
- ✅ Form inputs have `<label>` elements
- ✅ Error messages use `aria-live="polite"`
- ✅ Color contrast ≥ 4.5:1 (WCAG AA)
- ✅ Keyboard navigation works (Tab, Enter, Shift+Enter)
- ✅ Focus indicators visible
- ✅ Respects `prefers-reduced-motion`

### 6.4 Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (Chrome iOS, Safari iOS)
- ✅ ES6+ support required (no IE11 support)

### 6.5 Console Validation
- ✅ No JavaScript errors
- ✅ No console warnings
- ✅ API placeholder visible in code
- ✅ Initialization message logged

### 6.6 Feature Testing Checklist
- ✅ Question validation works (error on empty/short input)
- ✅ Button disabled during animation
- ✅ 3 cards flip sequentially (0ms, 400ms, 800ms delays)
- ✅ Card fronts display correct data (name, symbol, description)
- ✅ Different 3 cards appear on each divination
- ✅ AI interpretation section appears after final flip
- ✅ Loading spinner shows during (simulated) API call
- ✅ Reset button appears after reading
- ✅ New Reading button resets all state
- ✅ Input regains focus after reset

---

## Project Structure

```
ai-diviner/
├── index.html          # HTML structure
├── styles.css          # All styling & animations
├── script.js           # JavaScript logic & API integration
├── REQUIREMENTS.md     # Project requirements
└── PLAN.md            # This implementation plan
```

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Vanilla JS** | No build process needed, easy deployment |
| **CSS-only animations** | Better performance than JS-animated starry sky |
| **3D CSS transforms** | Native browser performance, no library overhead |
| **Fisher-Yates shuffle** | Guaranteed unique selection, fair distribution |
| **Staggered flip delays** | More dramatic, visually interesting than simultaneous flips |
| **Demo reader as fallback** | Allows testing and fallback if API unavailable |
| **Comments in code** | Clear integration path for users adding API keys |
| **Mobile-first CSS** | Better defaults for all devices, progressive enhancement |

---

## Potential Enhancements (Out of Scope)

1. **Card Orientation**: Randomly upright/reversed for interpretation variety
2. **Persistent History**: Store past readings in localStorage
3. **Share Readings**: Generate shareable reading URLs
4. **Multiple Spread Layouts**: 3-card cross, Celtic cross, etc.
5. **Audio**: Background music, card flip sound effects
6. **Animations**: Particle effects, mystical overlays
7. **Themes**: Light mode, different color schemes
8. **Localization**: Support multiple languages and card systems
9. **Backend Proxy**: Hide API keys by routing through own server
10. **Analytics**: Track popular questions, most drawn cards

---

## Success Verification

- ✅ All files created (index.html, styles.css, script.js)
- ✅ Deep purple + gold theme applied throughout
- ✅ Starry sky animates smoothly (CSS-only)
- ✅ Cards flip sequentially with 3D rotation (180° Y-axis)
- ✅ Cards display name + symbol + description on front
- ✅ Different 3 cards appear each divination (random shuffle)
- ✅ Responsive layout works across all viewport sizes
- ✅ Input validation prevents empty questions
- ✅ AI interpretation section hidden initially, revealed after flip
- ✅ API placeholder with detailed integration instructions
- ✅ Demo reading generator for testing without API
- ✅ Reset button allows new divinations
- ✅ No console errors
- ✅ Smooth 60fps animations
- ✅ Accessibility: aria-labels, keyboard support, focus states
- ✅ Respects prefers-reduced-motion
- ✅ Comments explain API integration points

---

## Timeline Estimate

- **Phase 1** (Setup): 15-20 minutes
- **Phase 2** (Design): 25-30 minutes
- **Phase 3** (Animation): 15-20 minutes
- **Phase 4** (Logic): 20-25 minutes
- **Phase 5** (API): 10-15 minutes
- **Phase 6** (Testing): 10-15 minutes

**Total**: ~2 hours for full implementation (includes testing)

---

## Notes for Developer

1. **API Keys**: Never hardcode production API keys. Use environment variables or backend proxy.
2. **Temperature Setting**: Adjust `temperature: 0.9` for more creative/deterministic readings (0-1 range).
3. **Prompt Customization**: The system prompt in API section can be adjusted for different reading styles.
4. **Error Handling**: Current implementation shows fallback message if API fails. Enhance with retry logic if needed.
5. **Loading Time**: Consider adding timeout if API is slow (>10s).
6. **Rate Limiting**: If using free API tiers, consider adding rate limiting to prevent overuse.
7. **Deck Expansion**: To add more card details, expand objects in `majorArcana` array.
8. **CSS Optimization**: Consider SCSS/PostCSS for production for smaller file size.
9. **Image Assets**: Currently uses Unicode for card symbols; upgrade to actual tarot card images later.
10. **Analytics**: Add tracking to understand user engagement and improve prompts.
