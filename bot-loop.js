// bot-loop.js
import fs from 'fs';
import { exchange, executeLiveTrade, logTrade } from './exchange.js';

const SYMBOL = 'BTC/USDT';
const LOSS_LIMIT_PERCENT = 0.05;
const STATE_FILE = 'balance_state.json';

async function getDailyStartingBalance() {
    const today = new Date().toDateString();
    if (fs.existsSync(STATE_FILE)) {
        const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        if (data.date === today) return data.balance;
    }
    const balance = await exchange.fetchBalance();
    const newBalance = balance.total['USDT'];
    fs.writeFileSync(STATE_FILE, JSON.stringify({ date: today, balance: newBalance }));
    return newBalance;
}

const runBotLoop = async () => {
    logTrade("--- Bot Loop Started ---");
    
    while (true) {
        try {
            const startBalance = await getDailyStartingBalance();
            const currentData = await exchange.fetchBalance();
            const currentBalance = currentData.total['USDT'];
            
            // Circuit Breaker logic
            if ((currentBalance - startBalance) / startBalance <= -LOSS_LIMIT_PERCENT) {
                logTrade("!!! DAILY LOSS LIMIT REACHED - HALTING !!!");
                process.exit(1);
            }

            const ticker = await exchange.fetchTicker(SYMBOL);
            
            // Your logic here
            if (ticker.last < 60000) { 
                await executeLiveTrade(SYMBOL, 'buy', 0.001, ticker.last);
            }
        } catch (error) {
            logTrade(`CRITICAL ERROR in loop: ${error.message}`);
        }
        
        // Safety delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
};

runBotLoop();