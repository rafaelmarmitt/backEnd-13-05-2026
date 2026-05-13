CREATE DATABASE wedding_pass;
use wedding_pass;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cpf VARCHAR(14)  NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('Admin','Cerimonialista') NOT NULL
);

CREATE TABLE mesas (
id_mesa INT AUTO_INCREMENT PRIMARY KEY,
numero_mesa INT NOT NULL UNIQUE,
capacidade INT NOT NULL DEFAULT 8
);

CREATE TABLE convidados (
id_convidado INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
sobrenome VARCHAR(50) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
telefone VARCHAR(14),
email VARCHAR(255),
fk_mesa INT,

FOREIGN KEY (fk_mesa) REFERENCES mesas(id_mesa) ON DELETE SET NULL
);

CREATE TABLE acompanhantes (
id_acompanhante INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
sobrenome VARCHAR(50) NOT NULL,
fk_convidado INT,

FOREIGN KEY(fk_convidado) REFERENCES convidados(id_convidado) ON DELETE CASCADE
);

CREATE TABLE checkins (
id_checkins INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_convidado INT NOT NULL,
data_hora_chegada DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT uk_convidado UNIQUE (id_convidado),
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
FOREIGN KEY (id_convidado) REFERENCES convidados(id_convidado) ON DELETE CASCADE
);

INSERT INTO usuarios (nome, cpf, email, senha, perfil) VALUES
('Admin','05322397094', 'adm@weddingpass.com','$2a$10$bwSNx0MXoNWkGlF8eQOwqeqIEJqvbjOkp5AJ2pkgzYoB8bK5cnLyq', 'Admin');

