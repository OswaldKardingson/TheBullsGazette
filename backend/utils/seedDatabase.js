
const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const seedDatabase = async () => {
    try {
        const articles = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
        for (const article of articles) {
            const { title, content, image_url } = article;
            await pool.query(
                'INSERT INTO articles (title, content, image_url, author_id) VALUES ($1, $2, $3, $4)',
                [title, content, image_url, 1]
            );
        }
        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        pool.end();
    }
};

seedDatabase();
