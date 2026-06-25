// run-backtest.js
import { runBacktest } from './backtester.js';
import { loadData } from './data-loader.js';

// Load the data from your new JSON file
const historicalData = loadData('./large-data.json');

// Run the backtest with the loaded data
runBacktest(historicalData);