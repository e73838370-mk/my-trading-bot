// exchange.js
import ccxt from 'ccxt';
import 'dotenv/config'; // This loads your .env file

export const exchange = new ccxt.binance({
    apiKey: process.env.API_KEY,      // Reads from environment, not hard-coded
    secret: process.env.API_SECRET,   // Reads from environment
    enableRateLimit: true,
    options: { 'sandboxMode': true }
});