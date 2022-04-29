<?php
include ('connection.php');
$sql_insert = "INSERT INTO products.fridgecontents (UID, productID, expirationDate) VALUES ('".$_GET["UID"]."', '".$_GET["productID"]."', '".$_GET["expirationDate"]."')";
if(mysqli_query($con,$sql_insert))  
{  
echo "Done";
mysqli_close($con);  
}  
else  
{  
echo "error is ".mysqli_error($con );  
}  
?> 