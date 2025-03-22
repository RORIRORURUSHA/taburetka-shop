const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/save-review', (req, res) => {
    const { productId, review } = req.body;
    const filePath = path.join(__dirname, 'reviews', `reviews_${productId}.json`);

    let reviews = [];
    if (fs.existsSync(filePath)) {
        reviews = JSON.parse(fs.readFileSync(filePath));
    }

    reviews.push(review);
    fs.writeFileSync(filePath, JSON.stringify(reviews));

    res.send({ success: true });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});