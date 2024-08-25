document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получение значения дохода
    const income = parseFloat(document.getElementById('income').value);

    // Проверка на корректность введенных данных
    if (isNaN(income) || income <= 0) {
        alert('Пожалуйста, введите корректное значение дохода.');
        return;
    }

    // Отправка данных на сервер для расчета налога
    fetch('/calculate-tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ income: income })
    })
    .then(response => response.json())
    .then(data => {
        // Обновление результатов на странице
        document.getElementById('tax-rate').textContent = `${data.taxRate}%`;
        document.getElementById('tax-amount').textContent = `$${data.taxAmount}`;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});


