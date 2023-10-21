document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pointForm');
    const resultTd = document.getElementById('result');
    const timeTd = document.getElementById('time');
    const executionTimeTd = document.getElementById('executionTime');
    const historyTable = document.getElementById('historyTable');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    // Обработчик нажатия на кнопку "Стереть историю"
    clearHistoryButton.addEventListener('click', function () {
        // Очистить Local Storage
        localStorage.removeItem('history');

        // Очистить таблицу истории (кроме шапки)
        while (historyTable.rows.length > 2) {
            historyTable.deleteRow(2);
        }
    });
    // Функция для сохранения результатов в Local Storage
    function saveResultToLocalStorage(result) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(result);
        localStorage.setItem('history', JSON.stringify(history));
    }

    // Функция для отображения истории из Local Storage
    function displayHistoryFromLocalStorage() {
        const history = JSON.parse(localStorage.getItem('history')) || [];

        // Очистить таблицу, оставив первую строку (шапку)
        while (historyTable.rows.length > 2) {
            historyTable.deleteRow(2);
        }

        history.forEach((entry, index) => {
            const row = historyTable.insertRow();
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = entry.x;
            row.insertCell(2).textContent = entry.y;
            row.insertCell(3).textContent = entry.r;
            row.insertCell(4).textContent = entry.result ? 'Попадание' : 'Промах';
            row.insertCell(5).textContent = entry.time;
            row.insertCell(6).textContent = entry.execution_time.toFixed(4) + ' сек';
        });
    }

    function showMessage(message, isError = false) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        if (isError) {
            messageDiv.style.color = 'red';
        } else {
            messageDiv.style.color = 'black';
        }

        setTimeout(function () {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    // Отобразить историю при загрузке страницы
    displayHistoryFromLocalStorage();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const x = parseFloat(document.getElementById('x').value);
        const y = parseFloat(document.getElementById('y').value);
        const rRadios = document.querySelectorAll('.r-option:checked'); // Выбранные радиокнопки для R
        let r = null;

        if (rRadios.length > 0) {
            r = parseFloat(rRadios[0].value); // Берем значение из выбранной радиокнопки
        } else {
            showMessage('Пожалуйста, выберите значение R.', true);
            return;
        }

        if (isNaN(x) || isNaN(y) || isNaN(r) || r <= 0) {
            showMessage('Пожалуйста, введите корректные значения.', true);
            return;
        }

        // Проверка значения Y
        if (y < -5 || y > 3) {
            showMessage('Значение Y должно быть в пределах от -5 до 3 включительно.', true);
            return;
        }

        fetch(`calculate.php?x=${x}&y=${y}&r=${r}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сервер вернул ошибку: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                resultTd.textContent = data.result ? 'Попадание' : 'Промах';
                timeTd.textContent = data.time;
                executionTimeTd.textContent = data.execution_time.toFixed(4) + ' сек';

                // Сохранить результат в Local Storage
                saveResultToLocalStorage(data);
                // Отобразить обновленную историю
                displayHistoryFromLocalStorage();
            })
            .catch(error => {
                // Обработка ошибок
                showMessage('Произошла ошибка при запросе к серверу: ' + error, true);
            });
    });

});

// Получаем элемент canvas и его контекст
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

// Задаем цвет линий и текста
ctx.strokeStyle = 'white';
ctx.fillStyle = 'white';

// Рисуем ось X
ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
ctx.lineTo(canvas.width, canvas.height / 2);
ctx.stroke();

// Рисуем текст "x" над осью X
ctx.fillText('x', canvas.width - 10, canvas.height / 2 + 10);
const r = 50;

const xCenter = canvas.width / 2;
const xHalf = xCenter + r / 2;
const xR = xCenter + r;

ctx.beginPath();
ctx.moveTo(xHalf, canvas.height / 2 - 5);
ctx.lineTo(xHalf, canvas.height / 2 + 5);

ctx.beginPath();
ctx.moveTo(xR, canvas.height / 2 - 5);
ctx.lineTo(xR, canvas.height / 2 + 5);
ctx.stroke();

// Добавляем текст над линиями
ctx.fillText('r/2', xHalf - 10, canvas.height / 2 - 10);
ctx.fillText('r', xR - 10, canvas.height / 2 - 10);

const r1 = 50;

const centerX = canvas.width / 2;
const xHalfNegative = centerX - r1 / 2;
const xNegativeR = centerX - r1;

ctx.beginPath();
ctx.moveTo(xHalfNegative, canvas.height / 2 - 5);
ctx.lineTo(xHalfNegative, canvas.height / 2 + 5);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(xNegativeR, canvas.height / 2 - 5);
ctx.lineTo(xNegativeR, canvas.height / 2 + 5);
ctx.stroke();

// Добавляем текст над линиями
ctx.fillText('-r/2', xHalfNegative - 15, canvas.height / 2 - 10);
ctx.fillText('-r', xNegativeR - 10, canvas.height / 2 - 10);



ctx.beginPath();
ctx.moveTo(canvas.width / 2, 0);
ctx.lineTo(canvas.width / 2, canvas.height);
ctx.stroke();

ctx.fillText('y', canvas.width / 2 + 10, 10);

const r2 = 50;

const centerY = canvas.height / 2;
const yHalfNegative = centerY - r2 / 2;
const yNegativeR = centerY - r2;

ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 5, yHalfNegative);
ctx.lineTo(canvas.width / 2 + 5, yHalfNegative);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 5, yNegativeR);
ctx.lineTo(canvas.width / 2 + 5, yNegativeR);
ctx.stroke();

// Добавляем текст слева от линий
ctx.fillText('r/2', canvas.width / 2 - 20, yHalfNegative + 5);
ctx.fillText('r', canvas.width / 2 - 20, yNegativeR + 5);

const r3 = 50;

const centerY1 = canvas.height / 2;
const yHalfNegative1 = centerY1 + r3 / 2;
const yNegativeR1 = centerY1 + r3;

ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 5, yHalfNegative1);
ctx.lineTo(canvas.width / 2 + 5, yHalfNegative1);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 5, yNegativeR1);
ctx.lineTo(canvas.width / 2 + 5, yNegativeR1);
ctx.stroke();

// Добавляем текст слева от линий
ctx.fillText('-r/2', canvas.width / 2 - 20, yHalfNegative1 + 5);
ctx.fillText('-r', canvas.width / 2 - 20, yNegativeR1 + 5);


const radius = 50;

const triangleHeight = radius / 2;

const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;
const vertex1X = canvasCenterX;
const vertex1Y = canvasCenterY;
const vertex2X = vertex1X + radius;
const vertex2Y = vertex1Y - triangleHeight / 20;
const vertex3X = vertex1X;
const vertex3Y = vertex1Y - triangleHeight;

ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
ctx.beginPath();
ctx.moveTo(vertex1X, vertex1Y);
ctx.lineTo(vertex2X, vertex2Y);
ctx.lineTo(vertex3X, vertex3Y);
ctx.closePath();
ctx.fill();



ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 50, Math.PI, 1.5 * Math.PI); // Четверть круга
ctx.lineTo(canvas.width / 2, canvas.height / 2);
ctx.closePath();
ctx.fill();


const r4 = 50;

const newWidth = r4;
const newHeight = r4 / 2;

const x1 = canvas.width / 2 - r4;
const y1 = canvas.height / 2;
const x2 = x1;
const y2 = y1 + newHeight;
const x3 = x1 + newWidth;
const y3 = y2;
const x4 = x3;
const y4 = y1;

ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);
ctx.lineTo(x4, y4);
ctx.closePath();
ctx.fill();




