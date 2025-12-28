require('dotenv').config({ path: './app.env' });
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

// GET all notes
app.get('/api/notes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notes ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single note
app.get('/api/notes/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new note
app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO notes (title, content) VALUES (?, ?)',
            [title, content]
        );
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update note
app.put('/api/notes/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        await db.query(
            'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, content, req.params.id]
        );
        res.json({ id: req.params.id, title, content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test database connection on startup
app.listen(PORT, '127.0.0.1', async () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    try {
        await db.query('SELECT 1');
        console.log('✅ Database connection verified');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
});