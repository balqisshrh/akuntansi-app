const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'User registered!' });
        }
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.send({ message: 'Login success', token });
    });
};

exports.getProfile = (req, res) => {
    const { id } = req.params;

    db.query('SELECT id, name, email, role_id FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results[0]);
    });
};

exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Profile updated' });
    });
};
