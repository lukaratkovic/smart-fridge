<?php
include('connection.php');
//Odabir vrijednosti retka sa postavkama
$sql = "SELECT * FROM settings LIMIT 1";

//Spremanje vrijednosti u varijablu result
$result = mysqli_query($con, $sql);

//Pretvaranje vrijednosti u json i slanje pozivnoj funkciji
$resultArray = mysqli_fetch_array($result);
echo json_encode($resultArray);