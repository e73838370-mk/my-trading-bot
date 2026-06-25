// data-loader.js
import fs from 'fs';

/**
 * Loads large datasets from a JSON file.
 * Expected file format: [ { "price": 100 }, { "price": 105 }, ... ]
 */
export const loadData = (filePath) => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
};