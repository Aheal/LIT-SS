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
$alias = $decoded_json->alias;

var_dump($decoded_json);

$sql = $conn->prepare("INSERT INTO Usuarios (Nombre,ApellidoPaterno,ApellidoMaterno,Correo_e,Telefono,Genero,Alias) VALUES (?,?,?,?,?,?,?)"); 
$sql -> bind_param("sssssss",$nombre,$apellidoP,$apellidoM,$correoE,$telefono,$genero,$alias);
$sql -> execute();

echo"New record created successfully";

$sql->close();
$conn -> close();

?>