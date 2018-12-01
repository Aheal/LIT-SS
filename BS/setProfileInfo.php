<?php
include 'connection.php'; 

$json = filter_input(INPUT_POST, 'json');
$decoded_json = json_decode($json);
$user = $decoded_json->user;
$nombre = $decoded_json->nombre; 
$escuela = $decoded_json->escuela;
$lema = $decoded_json->lema; 
$concurso = $decoded_json->concurso;
$bio = $decoded_json->bio; 
$logro1 = $decoded_json->logro1;
$logro2 = $decoded_json->logro2;
$logro3 = $decoded_json->logro3; 
$userID = 0;


$sql = $conn -> prepare("SELECT UsuarioID from Usuarios where Alias = ?");
$sql -> bind_param("s",$user);

if($sql -> execute()){
    // echo '1';
    $sql -> bind_result($userID); 
    $sql -> fetch();
    $sql->close();
    $sql = $conn->prepare("INSERT INTO perfil_participantes (UsuarioID,Lema,Bio) VALUES (?,?,?)");
    $sql -> bind_param("sss",$userID,$lema,$bio); 
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