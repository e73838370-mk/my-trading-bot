// --- STARTUP DEBUG ---
(async () => {
    try {
        console.log("--- BOT STARTUP INITIALIZED ---");
        
        // Timeout helper
        const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timed out")), ms));
        
        console.log("Attempting to connect to exchange...");
        
        // Race the connection against a 10-second timer
        await Promise.race([exchange.loadMarkets(), timeout(10000)]);
        
        console.log("Connection successful!");
    } catch (error) {
        console.error("CRITICAL STARTUP ERROR:", error.message);
        // Important: If it fails, we want the process to exit so Railway knows it failed
        process.exit(1); 
    }
})();
// --- END DEBUG ---
// ... your existing code follows ...
// exchange.js
import 'dotenv/config';
import ccxt from 'ccxt';

const exchangeConfig = {
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
    enableRateLimit: true,
};

export const exchange = new ccxt.binance(exchangeConfig);
exchange.setSandboxMode(true); 

export const getTradeAmount = async (symbol, percentage = 0.05) => {
    const balance = await exchange.fetchBalance();
    const usdtBalance = balance.free['USDT'] || 0;
    const ticker = await exchange.fetchTicker(symbol);
    const price = ticker.last;
    const amountToSpend = usdtBalance * percentage;
    const quantity = amountToSpend / price;
    return quantity;
};

export const executeLiveTrade = async (symbol, side, amount) => {
    try {
        const order = await exchange.createOrder(symbol, 'market', side, amount);
        console.log("Order executed successfully:", order);
        return order;
    } catch (error) {
        console.error("Trade Execution Failed:", error);
    }
};