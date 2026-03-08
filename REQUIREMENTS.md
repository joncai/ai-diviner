# AI Tarot Divination Web App - Requirements

## Project Overview
Create a single-page AI Tarot Divination web app using HTML, CSS, and JavaScript that provides users with mystical tarot readings powered by AI.

---

## Design Requirements

### Theme
- **Aesthetic**: Mysterious and magnificent
- **Primary Color**: Deep purple background
- **Accent Color**: Gold accents and textures
- **Overall Feel**: Mystical, ethereal, sophisticated

### Background
- **Implementation**: CSS-only or lightweight JavaScript animated starry sky effect
- **Performance**: Should not significantly impact page load time
- **Visual Impact**: Adds to the mystical atmosphere

### Layout
- **Responsiveness**: Fully responsive design
- **Approach**: Mobile-first design methodology
- **Card Display**: Centered layouts for card presentation
- **Flexibility**: Must adapt seamlessly from mobile (320px) to desktop (1200px+) viewports

---

## Functional Requirements

### User Input
- **Component**: Text area for user to enter their question
- **Example Questions**: "How is my career outlook?", "What does love hold for me?", etc.
- **Validation**: Question must be present before divination can start
- **Accessibility**: Proper labels and ARIA attributes

### Divination Initiation
- **Trigger**: "Start Divination" button
- **State**: Button should be disabled during animation
- **Feedback**: Clear visual/textual feedback for user actions

### Card Animation & Display
- **Quantity**: 3 tarot cards revealed sequentially
- **Animation Type**: High-quality 3D flipping animation
- **Technique**: CSS transform and transition for smooth 180-degree Y-axis rotation
- **Timing**: Sequential reveals with smooth staggered delays (not simultaneous)
- **Quality**: Professional, smooth 60fps performance

### Card Structure
- **Back Face**: Gold texture/pattern design
- **Front Face**: Card information with:
  - **Name**: Major Arcana card name (e.g., "The Fool")
  - **Symbol**: Unicode emoji/symbol (e.g., "✨")
  - **Description**: Brief 1-2 line card interpretation
- **Distinction**: Each of the 3 cards should be clearly distinct visually

### Card Selection
- **Sourcing**: Draw cards from Major Arcana deck (22 unique cards)
- **Randomization**: Different 3 cards selected each divination session
- **Uniqueness**: No duplicate cards in a single reading
- **Variety**: Ensures fresh experience with each divination

### AI Interpretation
- **Trigger**: Display after all 3 cards have flipped
- **Section**: Dedicated UI section for the AI-generated reading
- **Content**: AI should interpret the drawn cards in context of user's question
- **API Integration**: Placeholder for DeepSeek or OpenAI API integration
- **Flexibility**: Support for multiple AI providers (minimum: OpenAI, DeepSeek)

### Card Orientation
- **Optional Enhancement**: Randomize card orientation (upright/reversed) for interpretation variety
- **Impact**: Affects how the AI interprets the reading

### API Integration
- **Location**: JavaScript comments with clear integration instructions
- **Providers Supported**:
  - OpenAI (GPT-4 or compatible)
  - DeepSeek (DeepSeek-chat or compatible)
- **Security**: Include security warnings about API keys (do not hardcode in production)
- **Examples**: Provide working code examples for both providers

### Reset Functionality
- **Trigger**: After reading is displayed, user can start a new divination
- **State Reset**: Clear all inputs and cards for fresh session
- **UX**: Smooth transition back to input state

---

## Technical Requirements

### Technology Stack
- **Language**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Dependencies**: None required (CSS-only animations, no external libraries)
- **Compatibility**: Modern browsers (ES6+ support expected)

### Performance
- **Animation FPS**: Smooth 60fps on modern devices
- **Load Time**: Fast initial load (no heavy dependencies)
- **Responsive**: Efficient responsive design (mobile-first)

### Code Quality
- **Accessibility**: WCAG 2.1 compliance (aria-labels, keyboard support, focus states)
- **Mobile Support**: iOS/Android compatible
- **Reduced Motion**: Respect user's `prefers-reduced-motion` setting

---

## Deliverables

1. **index.html** - Complete HTML structure with semantic markup
2. **styles.css** - Full styling with responsive breakpoints and 3D animations
3. **script.js** - JavaScript logic with:
   - Card deck (22 Major Arcana)
   - Shuffle/randomization algorithm
   - Event handling and validation
   - 3D flip animation triggers
   - AI API integration placeholder (commented, ready to uncomment)
   - Demo reading generator for testing

---

## Success Criteria

- ✅ Deep purple + gold color scheme applied throughout
- ✅ Starry sky background animates smoothly
- ✅ 3 cards flip sequentially with 3D rotation effect
- ✅ Cards display name + symbol + description on front face
- ✅ Different 3 cards appear on each divination
- ✅ Responsive layout works on mobile, tablet, desktop
- ✅ AI interpretation section appears after final card flip
- ✅ API placeholder with integration instructions visible in code
- ✅ No console errors
- ✅ Smooth animations (60fps)
- ✅ Full accessibility support
