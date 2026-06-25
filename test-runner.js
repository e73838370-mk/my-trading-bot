// test-runner.js
import { validateTrade } from './validator.js';
import { getMarketConfluence } from './confluence.js';

const mockTicker = { last: "50000" };
const mockHistory = [{ price: 49000 }, { price: 49500 }, { price: 49800 }];

console.log("--- Starting Sandbox Test ---");

try {
    // 1. Test Validator
    const validation = validateTrade(mockTicker, 50000, 49000);
    console.log("Validator Result:", validation);

    // 2. Test Confluence
    const confluence = getMarketConfluence(mockTicker, mockHistory);
    console.log("Confluence Result:", confluence);

    console.log("--- Test Passed Successfully ---");
} catch (error) {
    console.error("CRASH DETECTED IN:", error.message);
}