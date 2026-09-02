create database fitLog;
use fitlog;

create table maquinas (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL ,
    grupoMuscular VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
    );
    
create table exercicio (
	id INT NOT NULL AUTO_INCREMENT,
    id_maquina INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    series INT NOT NULL,
    repeticao INT NOT NULL,
    peso FLOAT NOT NULL,
    concluido BOOLEAN NOT NULL,
    personal_record FLOAT NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
	atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
	CONSTRAINT fk_exercicio_maquina FOREIGN KEY (id_maquina) REFERENCES maquinas (id)
);
