<?php
include('connection.php');

$colorExpired = $_POST['colorExpired'];
$colorSoonToExpire = $_POST['colorSoonToExpire'];
$daysToExpiry = $_POST['daysToExpiry'];

$query = "UPDATE settings
    SET colorExpired='$colorExpired', colorSoonToExpire='$colorSoonToExpire', daysToExpiry=$daysToExpiry";

if(mysqli_query($con, $query)) echo "Successfully Inserted";
else echo "Insertion Failed";
