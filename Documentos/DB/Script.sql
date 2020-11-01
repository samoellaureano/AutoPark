create database autopark;
use autopark;

SELECT * FROM autopark.empresas;
INSERT INTO empresas VALUES(1,'66123685000171','Empresa - 01');

SELECT * FROM autopark.clientes;
delete from clientes where clientes.id = 5;

SELECT * FROM autopark.usuarios;
UPDATE usuarios set perfil = 1 where usuarios.id = 2;

SELECT * FROM autopark.marcas;
delete from marcas where id = 535;

SELECT * FROM autopark.tiposveiculos;
INSERT INTO tiposveiculos VALUES(1,'Motocicleta'),(2,'Automóvel'),(3,'Microônibus'),(4,'Triciclo'),(5,'Bicicleta'),(6,'Caminhonete'),(7,'Caminhão');

SELECT * FROM autopark.estacionamentos;
INSERT INTO estacionamentos VALUES(2,'66123685000171','Estacionamento 02','Rua Isolde Paulo,526','50',1);

SELECT * FROM autopark.tabeladeprecos;
INSERT INTO tabeladeprecos VALUES(1,'Carro/Hora',30,1,2);
