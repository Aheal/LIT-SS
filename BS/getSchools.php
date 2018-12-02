<?php 
    include "connection.php";

    $json = filter_input(INPUT_POST, 'json'); 
    $decoded_json = json_decode($json); 
    $array = array();

    $sql = $conn->prepare("SELECT id,nombre FROM escuelas");

    if($sql -> execute()){

    }

?>