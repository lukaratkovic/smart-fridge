<?php
include('connection.php');
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql =
    "SELECT productName FROM productinfo";

$result = $con->query($sql);

$jsonArray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jsonArray[] = $row;
}
echo json_encode($jsonArray);
