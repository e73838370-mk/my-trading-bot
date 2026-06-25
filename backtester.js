// backtester.js
import { validateTrade } from './validator.js';
import { shouldExecuteTrade } from './riskManager.js';

export const runBacktest = async (historicalData) => {
    let balance = 1000;
    let wins = 0;
    let losses = 0;
    let totalPnL = 0;
    
    // Constants
    const riskPerTrade = 0.02; // 2%
    const winRate = 0.55;      // Estimate based on historical performance

    for (let i = 20; i < historicalData.length - 1; i++) {
        const currentPrice = historicalData[i].price;
        const prevPrice = historicalData[i-1].price;
        const sma20 = 0; // Replace with your SMA logic
        
        // 1. Validator Check (Trend/Volatility)
        if (validateTrade({}, currentPrice, sma20, prevPrice, true).allowed) {
            
            const tradeSize = balance * riskPerTrade;
            
            // 2. Risk Manager Check (EV Gatekeeper)
            const analysis = shouldExecuteTrade(
                winRate, 
                tradeSize * 0.04, // 4% reward target
                1 - winRate, 
                tradeSize * 0.01, // 1% risk
                tradeSize,
                0.0002, // 0.02% spread
                0.10,   // $0.10 comms
                0.0006  // 0.06% slippage
            );

            if (analysis.execute) {
                const nextPrice = historicalData[i + 1].price;
                const result = tradeSize * ((nextPrice - currentPrice) / currentPrice);
                
                balance += result;
                totalPnL += result;
                if (result > 0) wins++; else losses++;
            }
        }
    }
    
    console.log(`--- FINAL PRODUCTION DEPLOYMENT ---`);
    console.log(`Total Trades: ${wins + losses}`);
    console.log(`Expectancy: $${(wins + losses) > 0 ? (totalPnL/(wins+losses)).toFixed(4) : 0}`);
    console.log(`Final Balance: $${balance.toFixed(2)}`);
};