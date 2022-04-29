<?php
include('connection.php');

$itemName=$_POST['itemName'];

$query="DELETE FROM preferredItems WHERE ID=(SELECT ID from productInfo WHERE productName='$itemName')";

mysqli_query($con, $query);
