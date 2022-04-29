<?php
include ('connection.php');
$sql_insert = "DELETE FROM products.fridgecontents where UID='".$_GET["UID"]."'";
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
