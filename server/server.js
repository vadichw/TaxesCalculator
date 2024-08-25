const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Настройка обработки данных из форм (для POST запросов)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Отдача статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../')));

// Обработка POST-запроса для расчета налога
app.post('/calculate-tax', (req, res) => {
    const income = parseFloat(req.body.income);
    let taxRate = 0;
    let taxAmount = 0;

    switch (true) {
        case (income <= 5000):
            taxRate = 5;
            break;
        case (income <= 15000):
            taxRate = 10;
            break;
        default:
            taxRate = 15;
            break;
    }

    taxAmount = (income * taxRate) / 100;

    res.json({
        taxRate: taxRate,
        taxAmount: taxAmount.toFixed(2)
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
