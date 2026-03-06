const fs = require('fs');
const csv = require('csv-parser');

const results = [];
fs.createReadStream('../scrapping/coursera-org-2026-03-06-2.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        let seedContent = fs.readFileSync('seed.js', 'utf8');

        // For each course in seed, find matching title in CSV
        results.forEach(row => {
            const title = row['title'] ? row['title'].trim() : null;
            const desc = row['program_description'] ? row['program_description'].replace(/'/g, '\\\'').trim() : null;

            if (title && desc) {
                const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Find title: 'Title',
                const titleRegex = new RegExp(`(title:\\s*'${escapedTitle}',)`);
                if (seedContent.match(titleRegex)) {
                    seedContent = seedContent.replace(titleRegex, `$1\n        program_description: '${desc}',`);
                }
            }
        });

        fs.writeFileSync('seed.js', seedContent);
        console.log('Successfully injected program_descriptions');
    });
