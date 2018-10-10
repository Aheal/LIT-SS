<?php

$temp = $_POST['registro'];

include 'connection.php'; 

$sql = "INSERT INTO Usuarios (Nombre,ApellidoPaterno,ApellidoMaterno,Correo_e,Telefono,Genero) 
        VALUES ('John','Doe','Lapa','aheal@gmail.com','9931538502','Masculino')"; 
if ($conn -> query($sql) === TRUE){
    echo "New record created successfully"; 
} else {
    echo "Error".$sql."<br>".$conn->error;
}        
$conn -> close();

?>