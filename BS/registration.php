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
$pass = $decoded_json->pass;
$codigo = hash("sha256",$alias.$correoE); 
$hashAlias = hash("sha256",$alias) ;
$hashPass = hash("sha256",$pass);
$verificado = "1";

$sql = $conn->prepare("INSERT INTO Usuarios (Nombre,Apellidos,Correo_e,Telefono,Genero,Alias,Codigo,Verificado) VALUES (?,?,?,?,?,?,?,?)"); 
$sql -> bind_param("ssssssss",$nombre,$apellidos,$correoE,$telefono,$genero,$alias,$codigo,$verificado);


if($sql -> execute()){
    // echo '1';
    $sql->close();
    $sql = $conn->prepare("INSERT INTO UWU (Alias,Pss) VALUES (?,?)");
    $sql -> bind_param("ss",$hashAlias,$hashPass); 
    if($sql -> execute())
        echo "0";
    else
        echo "1"; 
    $sql -> close();
} else {
    echo "1";
}

$conn -> close();

?>