<?php
include('connection.php');
$sql = "SELECT productinfo.productName, preferreditems.amount FROM productinfo INNER JOIN preferreditems ON preferreditems.ID=productinfo.ID";

//Spremanje vrijednosti u varijablu result
$result = mysqli_query($con, $sql);

//Pretvaranje vrijednosti u json i slanje pozivnoj funkciji
$jsonArray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jsonArray[] = $row;
}
echo json_encode($jsonArray);