<?php
function findWordIndices(array $words, string $target): array {
    $indices = [];

    foreach ($words as $index => $word) {
        if ($word === $target) {
            $indices[] = $index;
        }
    }

    return $indices;
}

$words = ["I","TWO","FORTY","THREE","JEN","TWO","TWO","Two"];
$target = "TWO";

$result = findWordIndices($words, $target);

echo "OUTPUT = Indices `" . implode(", ", $result) . " // [" . implode(',', $result) . "]";

