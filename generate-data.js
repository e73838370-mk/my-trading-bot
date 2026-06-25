// generate-data.js
import fs from 'fs';

const data = [];
let price = 50000;

for (let i = 0; i < 500; i++) {
    // Random price change between -1% and +1.1% (slight upward bias)
    const change = (Math.random() * 0.021) - 0.01;
    price = price * (1 + change);
    data.push({ price: parseFloat(price.toFixed(2)) });
}

fs.writeFileSync('large-data.json', JSON.stringify(data, null, 2));
console.log("large-data.json populated with 500 points.");