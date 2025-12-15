import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../public/data');
const SECRETS_FILE = path.join(__dirname, '../secrets.txt');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to hash the key
function hashKey(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
}

// Derangement shuffle (ensure no one picks themselves)
function getDerangement(array) {
    const n = array.length;
    let result = [...array];

    while (true) {
        // Fisher-Yates shuffle
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        // Check if valid derangement
        let isValid = true;
        for (let i = 0; i < n; i++) {
            if (result[i] === array[i]) {
                isValid = false;
                break;
            }
        }

        if (isValid) return result;
    }
}

// Main function
function main() {
    const participants = [
        "Maxim", "Marisa", "Lars", "Ayoub", "Jan", "Dominik",
        "Niklas", "Jolanda", "Philipp", "Daniel", "Anna", "Franzi"
    ];

    if (participants.length < 2) {
        console.error("Need at least 2 participants.");
        process.exit(1);
    }

    console.log(`Matching ${participants.length} participants...`);

    const shuffled = getDerangement(participants);
    const matches = [];
    const secrets = [];

    // Clear old data
    const files = fs.readdirSync(DATA_DIR);
    for (const file of files) {
        if (file.endsWith('.json')) {
            fs.unlinkSync(path.join(DATA_DIR, file));
        }
    }

    for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffled[i];

        // Generate a secure random key
        const key = crypto.randomBytes(16).toString('hex');
        const keyHash = hashKey(key);

        // Save the match data to a hashed filename
        const matchData = {
            giver: giver,
            receiver: receiver,
            generatedAt: new Date().toISOString()
        };

        fs.writeFileSync(
            path.join(DATA_DIR, `${keyHash}.json`),
            JSON.stringify(matchData, null, 2)
        );

        matches.push({ giver, receiver });
        secrets.push(`${giver}: ${key}`);
    }

    // Save secrets to a local file (gitignored)
    fs.writeFileSync(SECRETS_FILE, secrets.join('\n'));

    console.log("Matches generated successfully!");
    console.log(`Secrets saved to ${SECRETS_FILE}`);
    console.log(`Data files saved to ${DATA_DIR}`);
}

main();
