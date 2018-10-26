<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$alias = $decoded_json->alias; 


$sql = $conn->prepare("SELECT Alias FROM Usuarios WHERE Alias = ? "); 
$sql -> bind_param("s",$alias);
$sql -> execute();
$sql -> bind_result($exists); 
$sql  -> fetch();

if($exists){
    echo "1";
} else {
    echo "0";
}

$sql->close();
$conn -> close();

?>