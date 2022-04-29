<?php
include('connection.php');
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql =
    "SELECT productinfo.productName, fridgecontents.expirationDate, COUNT(fridgecontents.productID) AS Amount
    FROM products.fridgeContents
    INNER JOIN products.productInfo ON
        products.productInfo.ID = products.fridgeContents.productID
    GROUP BY productInfo.productName, fridgeContents.expirationDate";

$result = $con->query($sql);

$jsonArray = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jsonArray[] = $row;
}
echo json_encode($jsonArray);
