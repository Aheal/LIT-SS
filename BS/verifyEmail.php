<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$correoE = $decoded_json->correoE; 

var_dump($decoded_json);

$sql = $conn->prepare("SELECT Correo_E FROM Usuarios WHERE Correo_E = ? "); 
$sql -> bind_param("s",$correoE);
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