<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$nombre = $decoded_json->nombre; 
$apellidos = $decoded_json->apellidos;
$correoE = $decoded_json->correoE; 
$telefono = $decoded_json->telefono;
$genero = $decoded_json->genero; 
$alias = $decoded_json->alias;

var_dump($decoded_json);

$sql = $conn->prepare("INSERT INTO Usuarios (Nombre,Apellidos,Correo_e,Telefono,Genero,Alias) VALUES (?,?,?,?,?,?)"); 
$sql -> bind_param("ssssss",$nombre,$apellidos,$correoE,$telefono,$genero,$alias);
$sql -> execute();

echo"New record created successfully";

$sql->close();
$conn -> close();

?>