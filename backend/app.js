const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // <-- Tambahkan ini

// Route test default (opsional)
app.get('/', (req, res) => {
    res.send('Server Backend Berjalan!');
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
