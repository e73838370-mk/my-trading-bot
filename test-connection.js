// test-connection.js
import { exchange } from './exchange.js';

const runTest = async () => {
    try {
        console.log("--- Connecting to Binance Testnet ---");
        const balance = await exchange.fetchBalance();
        
        // This will print your free funds in the Testnet account
        console.log("Success! Connection established.");
        console.log("Account Balance:", balance.free); 
    } catch (error) {
        console.error("Connection Failed. Check your .env API keys.");
        console.error("Error Details:", error.message);
    }
};

runTest();