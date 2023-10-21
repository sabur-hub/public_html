<?php
header("Access-Control-Allow-Origin: *");

// Установка временной зоны
date_default_timezone_set('Europe/Moscow');

// Функция для проверки, попадает ли точка в область
function isPointInArea($x, $y, $r) {
    return ($x <= 0 && $y >= 0 && ($x ** 2 + $y ** 2) <= $r ** 2) || ($x <= 0 && $y <= 0 && $x >= -$r && $y >= -$r / 2) || (($x >= 0 && $y >= 0) && ($r*sqrt(5))/(2*($y))>=2*sqrt(5) && (($r*sqrt(5))/($x)>=2*sqrt(5)));
}


// Получаем параметры R и координаты точки из GET-запроса
if (isset($_GET['r']) && isset($_GET['x']) && isset($_GET['y'])) {
    $r = floatval($_GET['r']);
    $x = floatval($_GET['x']);
    $y = floatval($_GET['y']);

    // Валидация данных
    if ($r > 0) {
        // Проверка попадания точки в область
        $isInArea = isPointInArea($x, $y, $r);
        $currentTime = date('Y-m-d H:i:s');
        $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];

        // Отправляем результат в формате JSON
        header('Content-Type: application/json');
        echo json_encode([
            'r' => $r,
            'x' => $x,
            'y' => $y,
            'result' => $isInArea,
            'time' => $currentTime,
            'execution_time' => $executionTime
        ]);
    } else {
        echo 'Некорректное значение радиуса R';
    }
} else {
    echo 'Не все параметры переданы';
}
?>
