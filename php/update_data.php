<?php

header("Content-type: Application/json");
header("Access-control-allow-origin: *");
header("Access-control-allow-methods; PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include "../config.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(array("message" => "invalid json format", "status" => false));
    exit();
}

$sid = $input['id'];
$sname = $input['name'];
$sage = $input['age'];
$scity = $input['city'];

$sql = "update crud set name = '$sname', age = '$sage', city = '$scity' where id = $sid";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "data updated", "status" => true));
} else {
    echo json_encode(array("message" => "data updation failed", "status" => false));
}
