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

$sql = $conn->prepare("INSERT INTO Usuarios (Nombre,Apellidos,Correo_e,Telefono,Genero,Alias) VALUES (?,?,?,?,?,?)"); 
$sql -> bind_param("ssssss",$nombre,$apellidos,$correoE,$telefono,$genero,$alias);


if($sql -> execute()){
    echo '1';
}

$sql->close();
$conn -> close();

?>