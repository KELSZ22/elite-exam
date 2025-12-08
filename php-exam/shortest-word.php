<?php
function shortestWordLength($str) {
    $words = explode(' ', $str);
    $shortestWord = $words[0];
    $shortest = strlen($words[0]);

    foreach ($words as $word) {
        $len = strlen($word);
        if ($len < $shortest) {
            $shortest = $len;
            $shortestWord = $word;
        }
    }

    return [
        'word' => $shortestWord,
        'length' => $shortest
    ];
}

$result1 = shortestWordLength("TRUE FRIENDS ARE ME AND YOU");
echo "'{$result1['word']}' ({$result1['length']})\n";

$result2 = shortestWordLength("I AM THE LEGENDARY VILLAIN");
echo "'{$result2['word']}' ({$result2['length']})\n";
