<?php

header("Content-Type: Application/json");
header("Access-control-allow-origin: *");

include("../config.php");

$id = isset($_GET['id']) ? $_GET['id'] : die("no id is set");

$sql = "select * from crud where id = '$id'";

$response = mysqli_query($conn, $sql) or die("query failed");

if (mysqli_num_rows($response) > 0) {
    $output = mysqli_fetch_all($response, MYSQLI_ASSOC);
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    echo json_encode(array("message" => "cannot fetch single data", "status" => false));
}
