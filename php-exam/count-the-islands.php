<?php
function countIslands($grid) {
    $rows = count($grid);
    $cols = count($grid[0]);

    $visited = [];
    for ($i = 0; $i < $rows; $i++) {
        $visited[$i] = [];
        for ($j = 0; $j < $cols; $j++) {
            $visited[$i][$j] = false;
        }
    }

    $count = 0;

    function dfs($grid, &$visited, $r, $c, $rows, $cols) {
        $visited[$r][$c] = true;

        $directions = [
            [-1,-1], [-1,0], [-1,1],
            [0,-1],          [0,1],
            [1,-1],  [1,0],  [1,1]
        ];

        foreach ($directions as $d) {
            $nr = $r + $d[0];
            $nc = $c + $d[1];

            if ($nr >= 0 && $nr < $rows && $nc >= 0 && $nc < $cols
                && $grid[$nr][$nc] == 1 && !$visited[$nr][$nc]) {
                dfs($grid, $visited, $nr, $nc, $rows, $cols);
            }
        }
    }

    for ($i = 0; $i < $rows; $i++) {
        for ($j = 0; $j < $cols; $j++) {
            if ($grid[$i][$j] == 1 && !$visited[$i][$j]) {
                dfs($grid, $visited, $i, $j, $rows, $cols);
                $count++;
            }
        }
    }

    return $count;
}

function displayGrid($grid) {
    foreach ($grid as $row) {
        $displayRow = '';
        foreach ($row as $cell) {
            $displayRow .= $cell == 1 ? 'X' : '~';
        }
        echo '"' . $displayRow . '"' . "\n";
    }
}

$matrix = [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0]
];

displayGrid($matrix);
echo "\n";
echo "Number of islands: " . countIslands($matrix) . "\n";
