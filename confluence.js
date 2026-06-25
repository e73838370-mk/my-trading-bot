// confluence.js
export const getMarketConfluence = (ticker, history) => {
    // Example: Calculate simple Moving Average (SMA)
    const prices = history.map(h => h.price);
    const sma = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    return {
        price: ticker.last,
        sma: sma,
        trend: ticker.last > sma ? "BULLISH" : "BEARISH",
        volatility: "LOW" // Placeholder for more complex calculation
    };
};