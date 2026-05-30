CREATE DATABASE IF NOT EXISTS db_webrpg;
USE db_webrpg;

-- todo actually do this

-- 1. Tabela de Tipos
CREATE TABLE IF NOT EXISTS `tbl_tipo` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 2. Tabela de Editoras
CREATE TABLE IF NOT EXISTS `tbl_editora` ( 
  `id` INTEGER NOT NULL AUTO_INCREMENT, 
  `nome` varchar(50) NOT NULL, 
  `cidade` varchar(50) NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 3. Tabela de Veículos
CREATE TABLE IF NOT EXISTS `tbl_veiculo` ( 
  `id` INTEGER NOT NULL AUTO_INCREMENT, 
  `nome_completo` varchar(150) NOT NULL, 
  `acronimo` varchar(20), 
  `id_qualis` INTEGER, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 4. Tabela de Autores
CREATE TABLE IF NOT EXISTS `tbl_author` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `name_as_cited` varchar(50) NOT NULL,
  `email` varchar(100),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 5. Tabela de Referências (COM id_author)
CREATE TABLE IF NOT EXISTS `tbl_referencia` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `id_author` INTEGER NOT NULL,
  `id_tipo` INTEGER NOT NULL,
  `id_editora` INTEGER NOT NULL,
  `id_veiculo` INTEGER NOT NULL,
  `ano` int(4) NOT NULL,
  `pagina_i` int(5),
  `pagina_f` int(5),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ref_author` FOREIGN KEY (`id_author`) REFERENCES `tbl_author` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ref_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tbl_tipo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ref_editora` FOREIGN KEY (`id_editora`) REFERENCES `tbl_editora` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ref_veiculo` FOREIGN KEY (`id_veiculo`) REFERENCES `tbl_veiculo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 6. Tabela de Usuários
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(228) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ==========================================================
-- INSERÇÃO DE DADOS INICIAIS (SEEDS)
-- ==========================================================

INSERT INTO `tbl_tipo` (`descricao`) VALUES 
('Artigo em Conferência'), ('Artigo em Periódico'), ('Capítulo de Livro'), ('Livro'), ('Tese/Dissertação');

INSERT INTO `tbl_editora` (`nome`, `cidade`) VALUES 
('Editora da UFRGS', 'Porto Alegre'), ('Springer', 'Berlin'), ('Elsevier', 'Amsterdam'), ('ACM', 'New York');

INSERT INTO `tbl_veiculo` (`nome_completo`, `acronimo`, `id_qualis`) VALUES 
('Revista Brasileira de Informática na Educação', 'RBIE', 1),
('IEEE Transactions on Education', 'ToE', 1),
('SBC Brazilian Symposium on Computers in Education', 'SBIE', 2);

-- INSERIR AUTORES ANTES DA REFERÊNCIA
INSERT INTO `tbl_author` (`name`, `name_as_cited`) VALUES 
('Leandro Wives', 'Wives, L.'), 
('Alan Turing', 'TURING, A.');

-- AGORA SIM, A REFERÊNCIA (com id_author = 1)
INSERT INTO `tbl_referencia` (`titulo`, `id_author`, `id_tipo`, `id_editora`, `id_veiculo`, `ano`, `pagina_i`, `pagina_f`) 
VALUES ('Aprendizagem de Máquina na Educação', 1, 2, 1, 1, 2025, 10, 25);