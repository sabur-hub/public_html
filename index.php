<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Проверка точки в области</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
    <h1>Проверка точки в области</h1>
    <div class="image-container">
        <img src="areas.png" alt="Описание картинки">
    </div>
    <p>ФИО: Маллаев Сабур Н</p>
    <p>Группа: Р3209</p>
    <p>Вариант: 1985</p>
    <button id="clearHistoryButton">Стереть историю</button>
</header>

<main>
    <form id="pointForm" method="GET" action="./calculate.php">
        <canvas id="graph" width="400" height="400"></canvas>
        <table id="historyTable" class="history-table">
            <label for="x">Выберите значение X:</label>
            <select id="x" name="x">
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <tr>
                <th>Y</th>
                <th>Результат</th>
                <th>Время</th>
                <th>Время выполнения</th>
            </tr>
            <tr>
                <td><input type="text" id="y" name="y" placeholder="Y" maxlength="6"></td>
                <p>Выберите значение R:</p>
                <label><input type="radio" class="r-option" name="r" value="1"> 1</label>
                <label><input type="radio" class="r-option" name="r" value="1.5"> 1.5</label>
                <label><input type="radio" class="r-option" name="r" value="2"> 2</label>
                <label><input type="radio" class="r-option" name="r" value="2.5"> 2.5</label>
                <label><input type="radio" class="r-option" name="r" value="3"> 3</label>
                <td id="result"></td>
                <td id="time"></td>
                <td id="executionTime"></td>
            </tr>
        </table>
        <input type="submit" value="Проверить" id="submit">
        <div id="message" style="display: none;"></div>
    </form>
</main>

<script src="script.js"></script>
</body>
</html>
