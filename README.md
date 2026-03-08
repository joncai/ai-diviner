# AI Tarot Diviner 🔮

A mystical single-page web application for AI-powered tarot readings. Uses deep purple and gold aesthetics with smooth 3D card flip animations.

## Features

✨ **Stunning Design**
- Deep purple + gold color scheme
- CSS-only animated starry sky background
- Fully responsive (mobile-first design)
- Smooth 3D card flip animations

🎴 **Interactive Divination**
- Enter a question about your destiny
- Watch 3 random tarot cards flip sequentially
- Receive mystical AI-generated interpretations
- Reset for new readings

🤖 **AI Integration**
- Support for multiple AI providers:
  - Google Gemini (Free tier available)
  - OpenAI (GPT-4)
  - DeepSeek (Budget-friendly)
- Secure API key management
- Easy provider switching

## Quick Start

### 1. Clone & Open
```bash
git clone <repository-url>
cd ai-diviner
open index.html  # or open it in your browser
```

### 2. Configure Your API Key

Copy the configuration template and add your API key:

```bash
cp config.example.js config.js
```

Then edit `config.js` and replace `YOUR_GOOGLE_AI_KEY` with your actual API key.

### 3. Get an API Key

**Google Gemini (Recommended - Free tier available)**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your key to `config.js`

**OpenAI**
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Update `config.js` to use OpenAI provider
4. Copy your key to the `apiKey` field

**DeepSeek**
1. Go to [DeepSeek API](https://platform.deepseek.com/api-keys)
2. Create a new API key
3. Update `config.js` to use DeepSeek provider
4. Copy your key to the `apiKey` field

### 4. Test It Out

- Open `index.html` in your browser
- Ask a question about your future
- Click "Start Divination"
- Watch the cards flip and receive your reading!

## File Structure

```
ai-diviner/
├── index.html           # Main HTML structure
├── styles.css           # All styling & animations
├── script.js            # Application logic
├── config.js           # API configuration (local only, NOT committed)
├── config.example.js   # Configuration template (for reference)
├── .gitignore          # Excludes config.js from git
├── REQUIREMENTS.md     # Project requirements
├── PLAN.md            # Implementation plan
└── README.md          # This file
```

## API Configuration

The `config.js` file holds your API key and provider choice. It's automatically ignored by git (see `.gitignore`).

### Example: Google Gemini (Current)
```javascript
const API_CONFIG = {
    provider: 'google',
    apiKey: 'YOUR_ACTUAL_KEY_HERE',
    model: 'gemini-2.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
};
```

### Example: OpenAI
```javascript
const API_CONFIG = {
    provider: 'openai',
    apiKey: 'sk-...',
    model: 'gpt-4',
    endpoint: 'https://api.openai.com/v1/chat/completions'
};
```

### Example: DeepSeek
```javascript
const API_CONFIG = {
    provider: 'deepseek',
    apiKey: 'sk-...',
    model: 'deepseek-chat',
    endpoint: 'https://api.deepseek.com/v1/chat/completions'
};
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Animations**: CSS Transforms, Keyframes (no external libraries)
- **APIs**: Google Gemini, OpenAI, or DeepSeek

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Security Notes

⚠️ **Important**: Never commit `config.js` to version control.

The `.gitignore` file automatically excludes it, but always double-check before pushing:
```bash
git status  # Verify config.js is NOT listed
```

For production deployments, use:
- Environment variables
- Backend proxy server (to hide API keys)
- Serverless functions

## Troubleshooting

### "API Error: 404"
- Verify you're using the correct API key
- Check that the model name is valid (e.g., `gemini-2.5-flash`, not `gemini-2.0-flash`)
- Confirm your API provider in `config.js`

### "Please configure your API key"
- Edit `config.js` and replace placeholder with your actual API key
- Don't use `YOUR_GOOGLE_AI_KEY` as the actual key!

### Cards won't flip
- Check browser console for JavaScript errors
- Verify `config.js` is loading (check Network tab in DevTools)

## Development

### Run Locally
Simply open `index.html` in your browser. No build process needed!

### Customize
- **Colors**: Edit CSS variables in `styles.css` (lines 9-18)
- **Cards**: Add/modify cards in `majorArcana` array in `script.js`
- **Prompts**: Customize the tarot reading prompt in `generateAIReading()` function
- **Animation timing**: Adjust `flipDelays` in `flipCardsSequentially()`

## Future Enhancements

- Card orientation (upright/reversed) for varied interpretations
- Multiple spread layouts (3-card cross, Celtic cross, etc.)
- Reading history stored in localStorage
- Shareable reading URLs
- Audio effects (mystical music, card flip sounds)
- Dark/light theme toggle
- Multi-language support

## License

MIT License - Feel free to use and modify for personal or commercial projects.

## Credits

Created as an AI Tarot Divination web application with support for multiple AI providers. Designed with a focus on user experience, security, and clean, maintainable code.

---

**Ready to divine your future?** 🔮✨
