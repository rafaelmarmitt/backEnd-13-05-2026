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


INSERT INTO convidados (nome, sobrenome, cpf, telefone, email, fk_mesa) VALUES 
('1','2','111.111.111-11','(51)999999999','@.com',2),
('2','2','222.222.222-22','(51)999999999','d@.com',2),
('4','2','444.444.444-44','(51)999999999','@.com',2),
('5','2','555.555.555-55','(51)999999999','@.com',2),
('6','2','666.666.666-66','(51)999999999','@.com',2),
('7','2','777.777.777-77','(51)999999999','@.com',2),
('8','2','888.888.888-88','(51)999999999','@.com',2),
('9','2','999.999.999-99','(51)999999999','@.com',2),
('10','2','000.000.000-00','(51)999999999','@.com',2),
('11','2','010.010.010-01','(51)999999999','@.com',2),
('12','2','020.020.020-02','(51)999999999','@.com',2),
('13','2','030.030.030-03','(51)999999999','@.com',2),
('14','2','040.040.040-04','(51)999999999','@.com',2),
('15','2','050.050.050-05','(51)999999999','@.com',2),
('16','2','060.060.060-06','(51)999999999','@.com',2),
('17','2','070.070.070-07','(51)999999999','@.com',2),
('18','2','080.080.080-08','(51)999999999','@.com',2),
('19','2','090.090.090-09','(51)999999999','@.com',2),
('20','2','001.001.001-00','(51)999999999','@.com',2),
('21','2','002.002.002-00','(51)999999999','@.com',2),
('22','2','003.003.003-00','(51)999999999','@.com',2),
('23','2','004.004.004-00','(51)999999999','@.com',2),
('24','2','005.005.005-00','(51)999999999','@.com',2),
('25','2','006.006.006-00','(51)999999999','@.com',2),
('26','2','007.007.007-00','(51)999999999','@.com',2),
('27','2','008.008.008-00','(51)999999999','@.com',2),
('28','2','009.009.009-00','(51)999999999','@.com',2),
('29','2','101.101.101-10','(51)999999999','@.com',2),
('30','2','202.202.202-20','(51)999999999','@.com',2)