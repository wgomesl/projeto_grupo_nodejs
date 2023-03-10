CREATE DATABASE locadora_carros;

USE locadora_carros;

CREATE TABLE carros (
  id INT PRIMARY KEY,
  modelo VARCHAR(50),
  placa VARCHAR(8),
  km INT
);

INSERT INTO carros (id, modelo, placa, km) VALUES
  (1, 'Gol', 'ABC1234', 5000),
  (2, 'Celta', 'DEF5678', 10000),
  (3, 'Corolla', 'GHI9012', 20000),
  (4, 'HB20', 'JKL3456', 15000),
  (5, 'Uno', 'MNO7890', 8000);

CREATE TABLE agencias (
  id INT PRIMARY KEY,
  cidade VARCHAR(50),
  nome VARCHAR(50),
  qtd INT
);

INSERT INTO agencias (id, cidade, nome, qtd) VALUES
  (1, 'São Paulo', 'Agência 1', 10),
  (2, 'Rio de Janeiro', 'Agência 2', 5),
  (3, 'Belo Horizonte', 'Agência 3', 8),
  (4, 'Porto Alegre', 'Agência 4', 6),
  (5, 'Recife', 'Agência 5', 12);

CREATE TABLE funcionario (
  id INT PRIMARY KEY,
  nome VARCHAR(50),
  cpf VARCHAR(11),
  cargo VARCHAR(50)
);

INSERT INTO funcionario (id, nome, cpf, cargo) VALUES
  (1, 'João', '11111111111', 'Gerente'),
  (2, 'Maria', '22222222222', 'Vendedor'),
  (3, 'Pedro', '33333333333', 'Vendedor'),
  (4, 'Ana', '44444444444', 'Atendente'),
  (5, 'José', '55555555555', 'Atendente');

CREATE TABLE client (
  cpf VARCHAR(11) PRIMARY KEY,
  nome VARCHAR(50),
  email VARCHAR(50),
  telefone VARCHAR(11)
);

INSERT INTO client (cpf, nome, email, telefone) VALUES
  ('11111111111', 'Lucas', 'lucas@gmail.com', '11111111111'),
  ('22222222222', 'Julia', 'julia@gmail.com', '22222222222'),
  ('33333333333', 'Roberto', 'roberto@gmail.com', '33333333333'),
  ('44444444444', 'Mariana', 'mariana@gmail.com', '44444444444'),
  ('55555555555', 'Thiago', 'thiago@gmail.com', '55555555555');

CREATE TABLE empresas (
  cnpj VARCHAR(14) PRIMARY KEY,
  nomeempresa VARCHAR(50),
  telefone VARCHAR(11),
  localidade VARCHAR(50)
);

INSERT INTO empresas (cnpj, nomeempresa, telefone, localidade) VALUES
  ('11111111111111', 'Empresa 1', '11111111111', 'São Paulo'),
  ('22222222222222', 'Empresa 2', '22222222222', 'Rio de Janeiro'),
  ('33333333333333', 'Empresa 3', '33333333333', 'Belo Horizonte');
