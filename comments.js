// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const { body } = req;
    comments.push(body);

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).json({ message: 'Error saving comment' });
        } else {
            res.json({ message: 'Comment saved' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});