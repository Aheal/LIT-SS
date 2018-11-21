<?php  
    include "connection.php"; 

    $json = filter_input(INPUT_POST, 'json'); 
    $decoded_json = json_decode($json); 
    $alias = $decoded_json->alias;
    $pass = $decoded_json->pass; 
    $hasAlias = hash("sha256",$alias);
    $hashPass = hash("sha256",$pass);

    $sql = $conn->prepare("SELECT Verificado FROM Usuarios WHERE Alias = ?");
    $sql -> bind_param("s",$alias); 

    if ($sql -> execute()){
        $sql -> bind_result($verificado); 
        $sql -> fetch(); 
        $sql -> close(); 

        if($verificado == "0"){
            echo "2";
        } else {
            $sql = $conn->prepare("SELECT * FROM uwu WHERE Alias = ? AND Pss = ?");
            $sql -> bind_param("ss",$hasAlias,$hashPass); 
        
            if($sql -> execute()){
                $sql -> bind_result($exist); 
                $sql -> fetch();

                if($exist)
                    echo "0";
                else 
                    echo "3";
            }
            $sql -> close();
        }
    } else
        echo "1"; 
    
    $conn -> close();
?>