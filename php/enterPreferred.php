<?php
include('connection.php');

$itemName=$_POST['itemName'];
$amount=$_POST['amount'];

$query1="DELETE FROM preferredItems WHERE ID=(SELECT ID from productInfo WHERE productName='$itemName')";
$query2 = "INSERT INTO preferredItems VALUES ((SELECT ID from productInfo WHERE productName='$itemName'),$amount)";


mysqli_query($con, $query1);
mysqli_query($con, $query2);