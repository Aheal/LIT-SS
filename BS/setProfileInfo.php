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


$sql = $conn -> prepare("SELECT UsuarioID FROM Usuarios WHERE Alias = ?");
$sql -> bind_param("s",$user);

if($sql -> execute()){
    $sql -> bind_result($userID); 
    $sql -> fetch();
    $sql->close(); 
    $sql = $conn->prepare("SELECT UsuarioID FROM perfil_participantes WHERE UsuarioID = ?"); 
    $sql -> bind_param("s",$userID); 
    if ($sql -> execute()) {
        $sql -> bind_result($flag); 
        $sql -> fetch();
        $sql->close();  
        if($flag == "")
        {
            $sql = $conn->prepare("INSERT INTO perfil_participantes (UsuarioID,Lema,Bio,Logro1,Logro2,Logro3) VALUES (?,?,?,?,?,?)");
            $sql -> bind_param("ssssss",$userID,$lema,$bio,$logro1,$logro2,$logro3); 
            if($sql -> execute()){
                $sql -> close(); 
                $sql = $conn->prepare("UPDATE Usuarios SET Nombre = ? WHERE UsuarioID = ?");
                $sql -> bind_param("ss",$nombre,$userID);  
                if($sql -> execute()) 
                    echo "0";
                else 
                    echo "1";
                $sql -> close(); 
            }
            else {
                echo "1"; 
                $sql -> close();
            }
        }else{
            $sql = $conn->prepare("UPDATE perfil_participantes SET Lema = ?, Bio = ? , Logro1 = ?, Logro2 = ?, Logro3 = ? WHERE UsuarioID = ?");
            $sql -> bind_param("ssssss",$lema,$bio,$logro1,$logro2,$logro3,$userID); 
            if($sql -> execute()){
                $sql -> close(); 
                $sql = $conn->prepare("UPDATE Usuarios SET Nombre = ? WHERE UsuarioID = ?");
                $sql -> bind_param("ss",$nombre,$userID);  
                if($sql -> execute()) 
                    echo "0";
                else 
                    echo "1";
                $sql -> close(); 
            }
            else {
                echo "1"; 
                $sql -> close();
            }
        }
    } else {
        $sql->close(); 
        echo "1";
    }
} else {
    echo "1";
}

$conn -> close();

?>