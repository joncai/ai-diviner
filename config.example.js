/**
 * API Configuration Example
 * 
 * This file shows the expected structure for config.js
 * Copy this file to config.js and fill in your actual API key
 * 
 * DO NOT commit config.js to version control!
 * It is listed in .gitignore to prevent accidentally leaking your API key
 */

// ========================================
// GOOGLE GEMINI API CONFIGURATION
// ========================================
const API_CONFIG = {
    provider: 'google',
    apiKey: 'YOUR_GOOGLE_AI_KEY', // Get from https://aistudio.google.com/app/apikey
    model: 'gemini-2.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
};

// ========================================
// ALTERNATIVE: OPENAI CONFIGURATION
// ========================================
// Uncomment the block below to use OpenAI instead
// const API_CONFIG = {
//     provider: 'openai',
//     apiKey: 'YOUR_OPENAI_API_KEY', // Get from https://platform.openai.com/api-keys
//     model: 'gpt-4',
//     endpoint: 'https://api.openai.com/v1/chat/completions'
// };

// ========================================
// ALTERNATIVE: DEEPSEEK CONFIGURATION
// ========================================
// Uncomment the block below to use DeepSeek instead
// const API_CONFIG = {
//     provider: 'deepseek',
//     apiKey: 'YOUR_DEEPSEEK_API_KEY', // Get from https://platform.deepseek.com/api-keys
//     model: 'deepseek-chat',
//     endpoint: 'https://api.deepseek.com/v1/chat/completions'
// };

// ========================================
// NOTES
// ========================================
// - maxOutputTokens: 1000 (for Google) or max_tokens: 1000 (OpenAI/DeepSeek)
//   This is set in script.js and allows enough space for complete 3-4 sentence readings
// - temperature: 0.7
//   Balanced between creativity (0.0 = deterministic) and randomness (1.0 = creative)
// - All API providers are configured to generate focused tarot readings
//   in 3-4 sentences that address the seeker's specific question
