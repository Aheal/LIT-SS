<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$correoE = $decoded_json->correoE; 


$sql = $conn->prepare("SELECT Correo_E FROM Usuarios WHERE Correo_E = ? "); 
$sql -> bind_param("s",$correoE);
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