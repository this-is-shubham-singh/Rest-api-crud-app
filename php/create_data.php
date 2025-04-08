<?php

header("Content-type: Application/json");
header("Access-control-allow-origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../config.php";

$input = json_decode(file_get_contents("Php://input"), true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(array("message" => "request not in json", "status" => false));
    exit();
}

$uname = $input['name'];
$uage = $input['age'];
$city = $input['city'];


$sql = "insert into crud (name, age, city) values ('$uname', $uage, '$city')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "data added successfully", "status" => true));
} else {
    echo json_encode(array("message" => "data addition failed", "status" => false));
}
