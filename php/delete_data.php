<?php


header("Content-type: application/json");
header("Access-control-allow-origin: *");
header("Access-control-allow-method: DELETE");
header("Access-control-allow-headers:  Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "../config.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(array("message" => "invalid json data", "status" => false));
    exit();
}

$sid = $input['id'];

$sql = "Delete from crud where id = $sid";

if (mysqli_query($conn, $sql)) {
    echo json_encode(array("message" => "user deleted", "status" => true));
} else {
    echo json_encode(array("message" => "user deletion failed", "status" => false));
}
