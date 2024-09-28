<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (isset($inputData['name']) && isset($inputData['bloodType']) && isset($inputData['phone'])) {
        $file = 'bloodData.json';
        $bloodData = json_decode(file_get_contents($file), true);

         $bloodData[] = $inputData;

         if (file_put_contents($file, json_encode($bloodData, JSON_PRETTY_PRINT))) {
            echo json_encode(['message' => 'Blood type added successfully!']);
        } else {
            echo json_encode(['message' => 'Error writing to file!']);
        }
    } else {
        echo json_encode(['message' => 'Invalid input data!']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method!']);
}
?>
