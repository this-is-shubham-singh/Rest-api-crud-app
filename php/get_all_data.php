<?php

header('Content-Type: application/json');
header('Access-control-allow-origin: *');

include "../config.php";

$sql = "select * from crud";

$response = mysqli_query($conn, $sql) or die("query failed");

if (mysqli_num_rows($response) > 0) {
    $output = mysqli_fetch_all($response, MYSQLI_ASSOC);
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    echo json_encode(array('message' => "error in getting all data", 'status' => false));
}
