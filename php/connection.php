<?php
//Establishing connection with database
$username = "root";
$pass = "";
$host = "localhost";
$db_name = "products";
$con = mysqli_connect ($host, $username, $pass);
$db = mysqli_select_db ( $con, $db_name );
?>