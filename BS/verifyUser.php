<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$alias = $decoded_json->alias; 

var_dump($decoded_json);

$sql = $conn->prepare("SELECT Alias FROM Usuarios WHERE Alias = ? "); 
$sql -> bind_param("s",$alias);
$sql -> execute();
$sql -> bind_result($exists); 
$sql  -> fetch();

if($exists){
    echo "si ta!";
} else {
    echo "no ta!";
}

$sql->close();
$conn -> close();

?>