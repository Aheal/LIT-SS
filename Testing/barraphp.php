<?php  
    include "../BS/connection.php"; 
    $json = filter_input(INPUT_POST, 'json'); 
    $decoded_json = json_decode($json); 
    $enteredByUser = $decoded_json->barra;

    $forSql = $enteredByUser . "%";
    $sql = $conn->prepare("SELECT Alias FROM Usuarios WHERE Alias LIKE ? ");
    $sql -> bind_param("s",$forSql); 
    $encode = [];
    $users = new stdClass();
    $encode = array();
    if ($sql -> execute()){
        $result = $sql->get_result(); 
        while($row = $result->fetch_row()) {
            $encode[] = $row[0];
            $users->name = $row[0];
        }
    }
    $sql -> close();
    echo json_encode($encode);
    $conn -> close();
?>