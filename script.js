/* ========================================
   AI TAROT DIVINER - JAVASCRIPT
   ========================================
   This application uses a deck of 22 Major Arcana cards
   and provides a placeholder for AI-powered readings via
   DeepSeek or OpenAI APIs.
   ======================================== */

// ========================================
// MAJOR ARCANA DECK
// ========================================
const majorArcana = [
    { name: "The Fool", symbol: "✨", description: "New beginnings, taking risks, innocence" },
    { name: "The Magician", symbol: "🎩", description: "Resourcefulness, power, inspired action" },
    { name: "The High Priestess", symbol: "👑", description: "Intuition, sacred knowledge, divine feminine" },
    { name: "The Empress", symbol: "👸", description: "Nurture, abundance, fertility, femininity" },
    { name: "The Emperor", symbol: "🔱", description: "Authority, structure, control, father figure" },
    { name: "The Hierophant", symbol: "⛪", description: "Tradition, conformity, morality, ethics" },
    { name: "The Lovers", symbol: "💕", description: "Relationships, choices, alignment, values" },
    { name: "The Chariot", symbol: "🚗", description: "Control, willpower, determination, direction" },
    { name: "Strength", symbol: "💪", description: "Inner strength, courage, patience, self-control" },
    { name: "The Hermit", symbol: "🔦", description: "Soul searching, introspection, inner guidance" },
    { name: "Wheel of Fortune", symbol: "🎡", description: "Good luck, karma, life cycles, destiny" },
    { name: "Justice", symbol: "⚖️", description: "Justice, fairness, cause and effect, truth" },
    { name: "The Hanged Man", symbol: "🪢", description: "Pause, suspension, restriction, perspective" },
    { name: "Death", symbol: "🦴", description: "Transformation, endings, beginnings, transition" },
    { name: "Temperance", symbol: "⚗️", description: "Balance, moderation, patience, finding meaning" },
    { name: "The Devil", symbol: "😈", description: "Bondage, materialism, playfulness, detachment" },
    { name: "The Tower", symbol: "🏢", description: "Sudden change, upheaval, chaos, revelation" },
    { name: "The Star", symbol: "⭐", description: "Hope, faith, renewal, spirituality, tranquility" },
    { name: "The Moon", symbol: "🌙", description: "Illusion, fear, anxiety, subconscious, intuition" },
    { name: "The Sun", symbol: "☀️", description: "Success, vitality, joy, positivity, optimism" },
    { name: "Judgement", symbol: "📯", description: "Reflection, reckoning, awakening, absolution" },
    { name: "The World", symbol: "🌍", description: "Completion, fulfillment, wholeness, journey" }
];

// ========================================
// DOM ELEMENTS
// ========================================
const questionInput = document.getElementById('question');
const divinationBtn = document.getElementById('divination-btn');
const errorMessage = document.getElementById('error-message');
const cardElements = document.querySelectorAll('.card');
const interpretationSection = document.getElementById('interpretation-section');
const interpretationText = document.getElementById('interpretation-text');
const cardsDrawn = document.getElementById('cards-drawn');
const resetContainer = document.querySelector('.reset-container');
const resetBtn = document.getElementById('reset-btn');
const loadingSpinner = document.getElementById('loading-spinner');

// ========================================
// STATE MANAGEMENT
// ========================================
let selectedCards = [];
let isAnimating = false;

// ========================================
// EVENT LISTENERS
// ========================================

divinationBtn.addEventListener('click', startDivination);
resetBtn.addEventListener('click', resetDivination);
questionInput.addEventListener('input', clearErrorMessage);

// Allow Enter key to start divination (Shift+Enter for line break)
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isAnimating) {
        e.preventDefault();
        startDivination();
    }
});

// ========================================
// SHUFFLE FUNCTION
// Fisher-Yates shuffle algorithm to select 3 random unique cards
// ========================================
function shuffleDeck() {
    const deck = [...majorArcana];
    const selected = [];

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        selected.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
    }

    return selected;
}

// ========================================
// VALIDATION
// ========================================
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

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearErrorMessage() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// ========================================
// DIVINATION LOGIC
// ========================================
function startDivination() {
    // Validate input
    if (!validateQuestion()) {
        return;
    }

    if (isAnimating) {
        return;
    }

    isAnimating = true;
    divinationBtn.disabled = true;
    questionInput.disabled = true;

    // Shuffle and select 3 random cards
    selectedCards = shuffleDeck();

    // Display selected cards and populate card elements
    selectedCards.forEach((card, index) => {
        const cardElement = cardElements[index];
        const cardSymbol = cardElement.querySelector('.card-symbol');
        const cardName = cardElement.querySelector('.card-name');
        const cardDescription = cardElement.querySelector('.card-description');

        cardSymbol.textContent = card.symbol;
        cardName.textContent = card.name;
        cardDescription.textContent = card.description;
    });

    // Trigger sequential card flips
    flipCardsSequentially();
}

function flipCardsSequentially() {
    const flipDelays = [0, 400, 800]; // milliseconds

    flipDelays.forEach((delay, index) => {
        setTimeout(() => {
            const cardElement = cardElements[index];
            cardElement.classList.add('flipped');
        }, delay);
    });

    // After all cards are flipped, show AI interpretation section
    setTimeout(() => {
        showInterpretation();
        isAnimating = false;
    }, 1600); // 800ms + 600ms flip duration + buffer
}

// ========================================
// DISPLAY CARDS DRAWN
// ========================================
function updateCardsDrawn() {
    const cardNames = selectedCards.map(card => card.name).join(', ');
    cardsDrawn.textContent = cardNames;
}

// ========================================
// AI INTERPRETATION SECTION
// ========================================
function showInterpretation() {
    // Update cards drawn list
    updateCardsDrawn();

    // Show interpretation section
    interpretationSection.classList.remove('hidden');

    // Start loading AI interpretation
    loadingSpinner.style.display = 'block';
    interpretationText.textContent = 'Generating your reading...';

    // Call AI API (see API integration section below)
    generateAIReading();
}

// ========================================
// AI API INTEGRATION
// ========================================
/*
    ╔═══════════════════════════════════════════════════════════════╗
    ║                    API INTEGRATION GUIDE                      ║
    ║                                                               ║
    ║  To enable AI-powered readings, follow these steps:          ║
    ║                                                               ║
    ║  1. CHOOSE YOUR AI PROVIDER:                                 ║
    ║     • OpenAI: https://platform.openai.com/api-keys          ║
    ║     • DeepSeek: https://platform.deepseek.com/api-keys      ║
    ║     • Google Gemini: https://aistudio.google.com/app/apikey ║
    ║                                                               ║
    ║  2. GET YOUR API KEY:                                        ║
    ║     • Sign up for an account                                 ║
    ║     • Create an API key from your dashboard                  ║
    ║     • Store it securely (use environment variables)          ║
    ║                                                               ║
    ║  3. UPDATE THE CODE BELOW:                                   ║
    ║     • Replace YOUR_API_KEY with your actual key             ║
    ║     • Uncomment the provider you choose (A, B, or C)        ║
    ║     • Customize the system prompt as needed                 ║
    ║                                                               ║
    ║  4. SECURITY WARNING:                                        ║
    ║     Never commit your API key to version control!           ║
    ║     Use environment variables or backend proxy:             ║
    ║     const apiKey = process.env.REACT_APP_OPENAI_KEY;       ║
    ║                                                               ║
    ║  5. OPTIONAL: Set up a backend proxy to hide your API key   ║
    ║     (Recommended for production applications)                ║
    ║                                                               ║
    ║  6. PROVIDER NOTES:                                          ║
    ║     OpenAI: More expensive but very capable (GPT-4)         ║
    ║     DeepSeek: Budget-friendly, good quality (deepseek-chat) ║
    ║     Google Gemini: Free tier available, strong (gemini-2.0) ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
*/

async function generateAIReading() {
    try {
        // ─────────────────────────────────────────────────────────
        // STEP 1: Construct the prompt
        // ─────────────────────────────────────────────────────────
        const userQuestion = questionInput.value.trim();
        const cardNames = selectedCards.map(card => card.name).join(', ');
        const cardDescriptions = selectedCards.map(card => `${card.name}: ${card.description}`).join('\n');

        const prompt = `You are an expert mystical tarot reader. Provide a focused, insightful reading that directly addresses the seeker's question.

SEEKER'S QUESTION: "${userQuestion}"

THE THREE CARDS DRAWN (Past, Present, Future):
${cardDescriptions}

READING INSTRUCTIONS:
1. Interpret each card specifically in relation to the seeker's question
2. Explain how the cards connect to provide insight
3. Provide a direct answer to their specific question
4. Be mystical and poetic while remaining concise and specific
5. Include the card meanings and actionable guidance

Provide a focused but meaningful reading in exactly 3-4 sentences that addresses their specific concern.`;

        // ─────────────────────────────────────────────────────────
        // STEP 2: Choose API endpoint and configure
        // ─────────────────────────────────────────────────────────
        // STEP 2: Load API configuration and build endpoint
        // ─────────────────────────────────────────────────────────

        // Check if API_CONFIG is defined (from config.js)
        if (typeof API_CONFIG === 'undefined') {
            throw new Error('API Configuration not found. Please ensure config.js is loaded.');
        }

        if (API_CONFIG.apiKey === 'YOUR_GOOGLE_AI_KEY' || 
            API_CONFIG.apiKey === 'YOUR_OPENAI_API_KEY' || 
            API_CONFIG.apiKey === 'YOUR_DEEPSEEK_API_KEY') {
            throw new Error('Please configure your API key in config.js');
        }

        const { provider, apiKey, endpoint: baseEndpoint, model } = API_CONFIG;
        
        // Build provider-specific request
        let endpoint, requestBody, headers;

        if (provider === 'google') {
            // Google Gemini API
            endpoint = `${baseEndpoint}?key=${apiKey}`;
            requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a mystical tarot reader providing insightful, poetic readings.\n\n${prompt}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 2000,
                    temperature: 0.7
                }
            };
            headers = {
                'Content-Type': 'application/json'
            };
        } else if (provider === 'openai') {
            // OpenAI API
            endpoint = baseEndpoint;
            requestBody = {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert mystical tarot reader. Provide focused, personalized, poetic readings in 3-4 sentences that directly address the seeker\'s question.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            };
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
        } else if (provider === 'deepseek') {
            // DeepSeek API (same format as OpenAI)
            endpoint = baseEndpoint;
            requestBody = {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert mystical tarot reader. Provide focused, personalized, poetic readings in 3-4 sentences that directly address the seeker\'s question.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            };
            headers = {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            };
        } else {
            throw new Error(`Unknown API provider: ${provider}`);
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Parse response based on provider
        let aiReading;
        if (provider === 'google') {
            // Google Gemini: data.candidates[0].content.parts[0].text
            aiReading = data.candidates[0].content.parts[0].text;
        } else if (provider === 'openai' || provider === 'deepseek') {
            // OpenAI & DeepSeek: data.choices[0].message.content
            aiReading = data.choices[0].message.content;
        }

        if (!aiReading) {
            throw new Error('Invalid API response format');
        }

        // ─────────────────────────────────────────────────────────
        // STEP 4: Display the reading
        // ─────────────────────────────────────────────────────────

        loadingSpinner.style.display = 'none';
        interpretationText.textContent = aiReading;
        
        // Show reset button
        resetContainer.classList.remove('hidden');

    } catch (error) {
        console.error('Divination error:', error);
        loadingSpinner.style.display = 'none';
        interpretationText.textContent = 'The spirits whisper, but cannot be heard clearly. Please try again.';
        resetContainer.classList.remove('hidden');
    }
}

// ========================================
// DEMO READING GENERATOR
// ========================================
// This generates a simple reading from template while API is not configured
function generateDemoReading() {
    const templates = [
        `The universe has spoken. ${selectedCards[0].name} suggests your foundation in the matter at hand. ${selectedCards[1].name} reveals the present energy surrounding you. ${selectedCards[2].name} whispers of what is yet to come. Trust your intuition.`,
        
        `Your journey unfolds as follows: ${selectedCards[0].name} represents what has brought you here. ${selectedCards[1].name} marks your current crossroads. ${selectedCards[2].name} beckons toward transformation. Embrace the change with open hands.`,
        
        `The cards align to show: ${selectedCards[0].name} as your guiding principle, ${selectedCards[1].name} as the force at play now, and ${selectedCards[2].name} as the door opening before you. Your path grows clearer with each step.`,
        
        `Three glimpses of truth: ${selectedCards[0].name} holds what you must release. ${selectedCards[1].name} shows what requires your attention. ${selectedCards[2].name} promises what awaits beyond this moment. The choice remains yours.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
}

// ========================================
// RESET FUNCTION
// ========================================
function resetDivination() {
    // Clear input and state
    questionInput.value = '';
    questionInput.disabled = false;
    selectedCards = [];
    isAnimating = false;

    // Reset UI elements
    divinationBtn.disabled = false;
    errorMessage.textContent = '';
    interpretationSection.classList.add('hidden');
    resetContainer.classList.add('hidden');

    // Reset cards (remove flipped class and clear content)
    cardElements.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-symbol').textContent = '—';
        card.querySelector('.card-name').textContent = '—';
        card.querySelector('.card-description').textContent = '—';
    });

    // Focus back to input
    questionInput.focus();
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔮 AI Tarot Diviner initialized');
    console.log('API Integration: See generateAIReading() function for setup instructions');
    questionInput.focus();
});
