import fs from 'fs';
import path from 'path';
import yahooFinance from 'yahoo-finance2';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_FILE = path.join(__dirname, '../data/portfolio.json');
const PUBLIC_STOCKS_FILE = path.join(__dirname, '../public/stocks.json');

async function main() {
    if (!fs.existsSync(PORTFOLIO_FILE)) {
        console.error("Portfolio file not found.");
        process.exit(1);
    }

    const portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
    const results = [];

    console.log(`Fetching data for ${portfolio.length} stocks...`);

    for (const item of portfolio) {
        try {
            // Try using the default export directly, if it fails, try instantiating
            let quote;
            try {
                quote = await yahooFinance.quote(item.stockSymbol);
            } catch (e) {
                // If it's the specific error, try instantiating
                if (e.message.includes("new YahooFinance")) {
                    const yf = new yahooFinance();
                    quote = await yf.quote(item.stockSymbol);
                } else {
                    throw e;
                }
            }

            const currentPrice = quote.regularMarketPrice;
            const performance = ((currentPrice - item.entryPrice) / item.entryPrice) * 100;

            results.push({
                ...item,
                currentPrice,
                performance: parseFloat(performance.toFixed(2)),
                lastUpdated: new Date().toISOString()
            });

            console.log(`Updated ${item.stockSymbol}: ${currentPrice} (${performance.toFixed(2)}%)`);
        } catch (error) {
            console.error(`Failed to fetch ${item.stockSymbol}:`, error.message);
            results.push({
                ...item,
                error: "Failed to fetch data"
            });
        }
    }

    // Sort by performance (descending)
    results.sort((a, b) => (b.performance || -Infinity) - (a.performance || -Infinity));

    fs.writeFileSync(PUBLIC_STOCKS_FILE, JSON.stringify(results, null, 2));
    console.log(`Updated stocks data saved to ${PUBLIC_STOCKS_FILE}`);
}

main();
