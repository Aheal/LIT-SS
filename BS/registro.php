<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$nombre = $decoded_json->nombre; 
$apellidoP = $decoded_json->apellidoP;
$apellidoM = $decoded_json->apellidoM;
$correoE = $decoded_json->correoE; 
$telefono = $decoded_json->telefono;
$genero = $decoded_json->genero;

var_dump($decoded_json, $Nombre);

$sql = $conn->prepare("INSERT INTO Usuarios (Nombre,ApellidoPaterno,ApellidoMaterno,Correo_e,Telefono,Genero) 
        VALUES (?,?,?,?,?,?)"); 
$sql -> bind_param("ssssss",$nombre,$apellidoP,$apellidoM,$correoE,$telefono,$genero);
$sql -> execute();
echo"New record created successfully";

$sql->close();
$conn -> close();

?>