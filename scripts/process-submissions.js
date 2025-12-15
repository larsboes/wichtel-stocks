import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBMISSIONS_DIR = path.join(__dirname, '../submissions');
const PORTFOLIO_FILE = path.join(__dirname, '../data/portfolio.json');

// Ensure portfolio file exists
if (!fs.existsSync(PORTFOLIO_FILE)) {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify([], null, 2));
}

function main() {
    const files = fs.readdirSync(SUBMISSIONS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
        console.log("No submissions found.");
        return;
    }

    let portfolio = JSON.parse(fs.readFileSync(PORTFOLIO_FILE, 'utf-8'));
    let updated = false;

    for (const file of jsonFiles) {
        const filePath = path.join(SUBMISSIONS_DIR, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const submission = JSON.parse(content);

            // Validation
            if (!submission.participant || !submission.stockSymbol || !submission.entryPrice) {
                console.error(`Skipping invalid submission: ${file}`);
                continue;
            }

            // Check if participant already exists, update if so
            const existingIndex = portfolio.findIndex(p => p.participant === submission.participant);
            if (existingIndex >= 0) {
                console.log(`Updating existing entry for ${submission.participant}`);
                portfolio[existingIndex] = {
                    ...portfolio[existingIndex],
                    ...submission,
                    entryDate: new Date().toISOString().split('T')[0] // Set entry date to today
                };
            } else {
                console.log(`Adding new entry for ${submission.participant}`);
                portfolio.push({
                    ...submission,
                    entryDate: new Date().toISOString().split('T')[0]
                });
            }

            updated = true;

            // Delete the submission file
            fs.unlinkSync(filePath);
            console.log(`Processed and deleted: ${file}`);

        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    }

    if (updated) {
        fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolio, null, 2));
        console.log("Portfolio updated successfully.");
    }
}

main();
