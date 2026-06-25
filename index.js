// --- STARTUP DEBUG ---
(async () => {
    try {
        console.log("--- BOT STARTUP INITIALIZED ---");
        
        // Debugging environment variables
        console.log("Checking environment variables...");
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.API_SECRET;
        
        console.log("API_KEY exists:", !!apiKey);
        console.log("API_SECRET exists:", !!apiSecret);
        
        if (!apiKey || !apiSecret) {
            throw new Error("Missing API_KEY or API_SECRET in environment variables!");
        }

        const exchange = new ccxt.binance({
            apiKey: apiKey,
            secret: apiSecret,
        });
        
        console.log("Attempting to connect to exchange...");
        await exchange.loadMarkets(); 
        console.log("Connection successful!");
        
    } catch (error) {
        console.error("CRITICAL STARTUP ERROR:", error.message);
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