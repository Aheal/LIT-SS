
CREATE DATABASE IF NOT EXISTS LIT;
USE LIT;

CREATE TABLE IF NOT EXISTS Usuarios
(UsuarioID int NOT NULL AUTO_INCREMENT,
Nombre varchar(70) NOT NULL,
ApellidoPaterno varchar(70) NOT NULL,
ApellidoMaterno varchar(70) NOT NULL,
Correo_e varchar(70) NOT NULL,
Telefono int NOT NULL,
Genero varchar(40) NOT NULL,

PRIMARY KEY (UsuarioID)
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Participantes
(UsuarioID int NOT NULL,
F_nacimiento date NOT NULL,
Estado varchar(70) NOT NULL,
Ciudad varchar(70) NOT NULL,
EscuelaID int NOT NULL,
Grado int NOT NULL,
Categoria varchar(15) NOT NULL,
ConcursoID varchar(15) NOT NULL,

INDEX (UsuarioID),
FOREIGN KEY (UsuarioID)
REFERENCES Usuarios(UsuarioID)
ON DELETE CASCADE
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Perfil_Participantes
(UsuarioID int NOT NULL,
Lema varchar(255),
Bio varchar(255),

INDEX (UsuarioID),
FOREIGN KEY (UsuarioID)
REFERENCES Usuarios(UsuarioID)
ON DELETE CASCADE
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Logros
(UsuarioID int NOT NULL,
Descripcion varchar(255) NOT NULL,


INDEX (UsuarioID),
FOREIGN KEY (UsuarioID)
REFERENCES Usuarios(UsuarioID)
ON DELETE CASCADE
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Concurso
(ConcursoID int NOT NULL AUTO_INCREMENT,
Nombre varchar(70) NOT NULL,
EncargadoID int NOT NULL,
PRIMARY KEY(ConcursoID)
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Escuelas
(EscuelaID int NOT NULL AUTO_INCREMENT,
Nombre varchar(255) NOT NULL,
Ciudad varchar(70) NOt NULL,
Estado varchar(70) NOT NULL,
Direccion varchar(255) NOT NULL,
ContactoPrincipal varchar(255) NOT NULL,
ContactoSecundario varchar(255) NOT NULL, 
PRIMARY KEY (EscuelaID)
)ENGINE = INNODB, CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS UWU
(UsuarioID int NOT NULL,
Psswd varchar(300) NOT NULL,


INDEX (UsuarioID),
FOREIGN KEY (UsuarioID)
REFERENCES Usuarios(UsuarioID)
ON DELETE CASCADE
)ENGINE = INNODB, CHARSET=utf8mb4;
