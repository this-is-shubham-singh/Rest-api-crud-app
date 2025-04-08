<?php

include "../config.php";

header("Content-type: application/json");
header("Access-control-allow-origin: *");

$search_term = isset($_GET['search']) ? $_GET['search'] : die("no search term");

$sql = "select * from crud where name like '%{$search_term}%'";

$response = mysqli_query($conn, $sql) or die("query failed");

if (mysqli_num_rows($response) > 0) {
    $arr = mysqli_fetch_all($response, MYSQLI_ASSOC);
    echo json_encode($arr, JSON_PRETTY_PRINT);
} else {
    echo json_encode(array("message" => "no data found", "status" => false));
}
