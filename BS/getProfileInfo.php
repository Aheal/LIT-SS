<?php
    include 'connection.php'; 

    $json = filter_input(INPUT_POST, 'json');
    $decoded_json = json_decode($json); 

    $user = $decoded_json->user; 

    $userID = 0;
    $nombre = "";
    $lema = ""; 
    $bio = ""; 
    $logro1 = "";
    $logro2 = "";
    $logro3 = ""; 

    $participante = new stdClass();
    

    $sql = $conn -> prepare("SELECT UsuarioID,Nombre FROM Usuarios WHERE Alias = ? "); 
    $sql -> bind_param("s",$user); 

    if($sql -> execute()) {  

        $sql -> bind_result($userID,$nombre);
        $sql -> fetch();
        $sql->close();

        $sql = $conn -> prepare("SELECT Lema,Bio,Logro1,Logro2,Logro3 FROM perfil_participantes WHERE UsuarioID = ?"); 
        $sql -> bind_param("s",$userID); 

        if($sql -> execute()){

            $sql -> bind_result($lema,$bio,$logro1,$logro2,$logro3);
            $sql -> fetch();
            $sql->close();  

            $participante->name = $nombre;
            $participante->motta = $lema;
            $participante->bio = $bio;
            $participante->achievement1 = $logro1;
            $participante->achievement2 = $logro2;
            $participante->achievement3 = $logro3; 

            $JSON  = json_encode($participante);

            echo $JSON;
        }else{
            $sql->close();
            echo "1";
        }

    }else {
        $sql->close(); 
        echo "1";
    }
?>