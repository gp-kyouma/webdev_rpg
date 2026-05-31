CREATE DATABASE IF NOT EXISTS db_webrpg;
USE db_webrpg;

-- these first few tables are for what is essentially hardcoded data
-- item data, enemy data, etc
-- won't be altered over the course of a game, are mostly here for queries

CREATE TABLE IF NOT EXISTS Items (
  -- attributes common to all items
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'WPN_IRON_SWORD'
  item_name varchar(20) NOT NULL,          -- actual display name, eg. 'Iron Sword'
  item_description varchar(50) NOT NULL,   -- flavortext
  gold_value INTEGER NOT NULL,
  rarity varchar(10) NOT NULL,      -- 'COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'
  equipment boolean NOT NULL,       -- if false then this item is a consumable
  effect varchar(50) DEFAULT NULL,  -- relevant json string, to be parsed at relevant times
  -- equipment-specific attributes
  equip_slot varchar(10) DEFAULT NULL,    -- 'WEAPON' / 'ARMOR' / 'ACCESSORY'
  equip_type varchar(10) DEFAULT NULL,    -- 'SWORD' / 'STAFF' / 'LIGHT' / 'HEAVY' / and so on
  hp INTEGER DEFAULT NULL,
  mp INTEGER DEFAULT NULL,
  str INTEGER DEFAULT NULL,
  def INTEGER DEFAULT NULL,
  mag INTEGER DEFAULT NULL,
  spd INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS Skills (
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'SKILL_SHIELDBASH_1'
  skill_name varchar(20) NOT NULL,          -- actual display name, eg. 'Shield Bash'
  skill_description varchar(50) NOT NULL,   -- flavortext
  cost INTEGER NOT NULL,              -- mp cost
  effect varchar(50) NOT NULL,        -- json string
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS Classes (
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'CLASS_WARRIOR'
  class_name varchar(20) NOT NULL,          -- actual display name, eg. 'Warrior'
  class_description varchar(50) NOT NULL,   -- flavortext
  -- starting stats
  hp INTEGER NOT NULL,
  mp INTEGER NOT NULL,
  str INTEGER NOT NULL,
  def INTEGER NOT NULL,
  mag INTEGER NOT NULL,
  spd INTEGER NOT NULL,
  -- stat growth per level up
  hp_growth INTEGER NOT NULL,
  mp_growth INTEGER NOT NULL,
  str_growth INTEGER NOT NULL,
  def_growth INTEGER NOT NULL,
  mag_growth INTEGER NOT NULL,
  spd_growth INTEGER NOT NULL,
  -- skill/spell progression
  -- 'skill_X' is learned at level X
  -- if no change, just repeat last value
  skill_1 varchar(20) NOT NULL,
  skill_5 varchar(20) NOT NULL,
  skill_10 varchar(20) NOT NULL,
  skill_15 varchar(20) NOT NULL,
  skill_20 varchar(20) NOT NULL,
  -- 'default' weapon and armor types (used for loot generation)
  weapon_type varchar(10) NOT NULL, -- 'SWORD' / 'STAFF' / and so on
  armor_type varchar(10) NOT NULL,  -- 'LIGHT' / 'HEAVY' / and so on
  -- starting items (can be null)
  weapon varchar(20) DEFAULT NULL,
  armor varchar(20) DEFAULT NULL,
  accessory varchar(20) DEFAULT NULL,
  item1 varchar(20) DEFAULT NULL,
  item2 varchar(20) DEFAULT NULL,
  item3 varchar(20) DEFAULT NULL,
  item4 varchar(20) DEFAULT NULL,
  -- table references
  -- (not sure how useful they would be in this scenario exactly but do them anyway)
  -- referencing the handles instead of the ids for better readability
  FOREIGN KEY (skill_1)   REFERENCES Skills (handle),
  FOREIGN KEY (skill_5)   REFERENCES Skills (handle),
  FOREIGN KEY (skill_10)  REFERENCES Skills (handle),
  FOREIGN KEY (skill_15)  REFERENCES Skills (handle),
  FOREIGN KEY (skill_20)  REFERENCES Skills (handle),
  FOREIGN KEY (weapon)    REFERENCES Items (handle),
  FOREIGN KEY (armor)     REFERENCES Items (handle),
  FOREIGN KEY (accessory) REFERENCES Items (handle),
  FOREIGN KEY (item1)     REFERENCES Items (handle),
  FOREIGN KEY (item2)     REFERENCES Items (handle),
  FOREIGN KEY (item3)     REFERENCES Items (handle),
  FOREIGN KEY (item4)     REFERENCES Items (handle),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- TODO TABLES:
-- ENEMYDATA

-- these next tables hold mutable data:
-- users, current games, high scores

CREATE TABLE IF NOT EXISTS LoginUsers (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(128) NOT NULL,
  user_password varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- TODO TABLES:
-- GAMESTATES (will hold player data inside, there's no real reason for player to be a separate table)

CREATE TABLE IF NOT EXISTS Scores (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  gameover_time TIMESTAMP NOT NULL, -- time of run end
  char_name varchar(30) NOT NULL, -- character name
  floor INTEGER NOT NULL,
  total_exp INTEGER NOT NULL, -- can calculate final level from this
  total_value INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES LoginUsers (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- this is a fake incomplete table for testing, delete later
CREATE TABLE IF NOT EXISTS GameStatesFake (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  char_name varchar(30) NOT NULL,
  floor INTEGER NOT NULL,
  map_data varchar(100) NOT NULL, -- it's 90 characters but i only just now considered the possibility of \n being two chars so 100 it is
  FOREIGN KEY (user_id) REFERENCES LoginUsers (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ==========================================================
-- INSERÇÃO DE DADOS INICIAIS (SEEDS)
-- ==========================================================
INSERT INTO LoginUsers (username, user_password) VALUES 
('JOHN TEST','123456');

INSERT INTO GameStatesFake (user_id, char_name, floor, map_data) VALUES 
(1,'JIMMY TEST',3,
'         
         
    $    
   CD    
    SDDB 
         
         
         
         ');--some random bs
/*
INSERT INTO tbl_tipo (descricao) VALUES 
(Artigo em Conferência), (Artigo em Periódico), (Capítulo de Livro), (Livro), (Tese/Dissertação);

INSERT INTO tbl_editora (nome, cidade) VALUES 
(Editora da UFRGS, Porto Alegre), (Springer, Berlin), (Elsevier, Amsterdam), (ACM, New York);

INSERT INTO tbl_veiculo (nome_completo, acronimo, id_qualis) VALUES 
(Revista Brasileira de Informática na Educação, RBIE, 1),
(IEEE Transactions on Education, ToE, 1),
(SBC Brazilian Symposium on Computers in Education, SBIE, 2);

-- INSERIR AUTORES ANTES DA REFERÊNCIA
INSERT INTO tbl_author (name, name_as_cited) VALUES 
(Leandro Wives, Wives, L.), 
(Alan Turing, TURING, A.);

-- AGORA SIM, A REFERÊNCIA (com id_author = 1)
INSERT INTO tbl_referencia (titulo, id_author, id_tipo, id_editora, id_veiculo, ano, pagina_i, pagina_f) 
VALUES (Aprendizagem de Máquina na Educação, 1, 2, 1, 1, 2025, 10, 25);
*/