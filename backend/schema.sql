CREATE DATABASE IF NOT EXISTS db_webrpg;
USE db_webrpg;

--======================================================================================--

-- these first few tables are for what is essentially hardcoded data
-- item data, enemy data, etc
-- won't be altered over the course of a game, are mostly here for queries

--======================================================================================--

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

--======================================================================================--

CREATE TABLE IF NOT EXISTS Skills (
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'SKILL_FIRE_1'

  skill_name varchar(20) NOT NULL,          -- actual display name, eg. 'Fire'
  skill_description varchar(50) NOT NULL,   -- flavortext

  cost INTEGER NOT NULL,              -- mp cost (for players. enemies do not use mp)
  effect varchar(50) NOT NULL,        -- json string

  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

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

--======================================================================================--

CREATE TABLE IF NOT EXISTS EnemyData (
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'ENEMY_GIANT_RAT'

  enemy_name varchar(20) NOT NULL,    -- actual display name, eg. 'Giant Rat'

  is_boss boolean NOT NULL,
  starting_floor INTEGER NOT NULL, -- first floor where this enemy appears
  stopping_floor INTEGER, -- last floor where this enemy appears

  -- for stat calculation purposes (mostly for bosses)
  base_level INTEGER NOT NULL,
  max_level INTEGER,
  level_up_factor FLOAT NOT NULL, -- gain +x% of each stat, per level (past base level)

  -- base stats (at base level)
  hp INTEGER NOT NULL,
  str INTEGER NOT NULL,
  def INTEGER NOT NULL,
  mag INTEGER NOT NULL,
  spd INTEGER NOT NULL,

  skill varchar(20),

  gold_dropped INTEGER NOT NULL,
  exp_dropped INTEGER NOT NULL,

  FOREIGN KEY (skill) REFERENCES Skills (handle),

  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

-- these next tables hold mutable data:
-- users, current games, high scores

--======================================================================================--

CREATE TABLE IF NOT EXISTS LoginUsers (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(128) NOT NULL,
  user_password varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

-- GAMESTATES will hold player data inside, there's no real reason for player to be a separate table
-- GAMESTATES are updated on *floor* transition, this simplifies the amount of data that needs storage

CREATE TABLE IF NOT EXISTS GameStates (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,

  -- current floor data:
  floor INTEGER NOT NULL,

  -- map data
  map_data varchar(100) NOT NULL, -- it's 90 characters but i only just now considered the possibility of \n being two chars so 100 it is

  -- shop data
  shop1_id INTEGER DEFAULT NULL,
  shop2_id INTEGER DEFAULT NULL,
  shop3_id INTEGER DEFAULT NULL,
  shop4_id INTEGER DEFAULT NULL,

  -- chest data
  chest_id INTEGER DEFAULT NULL,
  is_mimic boolean NOT NULL,

  -- boss data
  boss_id INTEGER DEFAULT NULL,
  boss_level INTEGER NOT NULL,

  -- player data:
  char_name varchar(30) NOT NULL,

  current_hp INTEGER NOT NULL,
  current_mp INTEGER NOT NULL,

  max_hp INTEGER NOT NULL,
  max_mp INTEGER NOT NULL,

  str INTEGER NOT NULL,
  def INTEGER NOT NULL,
  mag INTEGER NOT NULL,
  spd INTEGER NOT NULL,

  exp INTEGER NOT NULL,
  lvl INTEGER NOT NULL, -- can be calculated from exp, but store anyways, for convenience
  gold INTEGER NOT NULL,

  class_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,

  weapon_id INTEGER DEFAULT NULL,
  armor_id INTEGER DEFAULT NULL,
  accessory_id INTEGER DEFAULT NULL,

  item1_id INTEGER DEFAULT NULL,
  item2_id INTEGER DEFAULT NULL,
  item3_id INTEGER DEFAULT NULL,
  item4_id INTEGER DEFAULT NULL,

  -- references
  FOREIGN KEY (user_id)       REFERENCES LoginUsers (id) ON DELETE CASCADE,

  FOREIGN KEY (shop1_id)      REFERENCES Items (id),
  FOREIGN KEY (shop2_id)      REFERENCES Items (id),
  FOREIGN KEY (shop3_id)      REFERENCES Items (id),
  FOREIGN KEY (shop4_id)      REFERENCES Items (id),

  FOREIGN KEY (chest_id)      REFERENCES Items (id),

  FOREIGN KEY (boss_id)       REFERENCES EnemyData (id),

  FOREIGN KEY (class_id)      REFERENCES Classes (id),
  FOREIGN KEY (skill_id)      REFERENCES Skills (id),

  FOREIGN KEY (weapon_id)     REFERENCES Items (id),
  FOREIGN KEY (armor_id)      REFERENCES Items (id),
  FOREIGN KEY (accessory_id)  REFERENCES Items (id),

  FOREIGN KEY (item1_id)      REFERENCES Items (id),
  FOREIGN KEY (item2_id)      REFERENCES Items (id),
  FOREIGN KEY (item3_id)      REFERENCES Items (id),
  FOREIGN KEY (item4_id)      REFERENCES Items (id),

  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

CREATE TABLE IF NOT EXISTS Scores (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NOT NULL,

  gameover_time TIMESTAMP NOT NULL, -- time of run end
  char_name varchar(30) NOT NULL, -- character name
  floor INTEGER NOT NULL,
  total_exp INTEGER NOT NULL,
  final_level INTEGER NOT NULL,
  total_value INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES LoginUsers (id) ON DELETE CASCADE,

  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

-- ==========================================================
-- INSERÇÃO DE DADOS INICIAIS (SEEDS)
-- ==========================================================

INSERT INTO Items
(handle,                item_name,      item_description,           gold_value, rarity,   equipment,  effect,           equip_slot, equip_type, hp, mp, str,  def,  mag,  spd) VALUES
('WPN_TEST_SWORD',      'Test Sword',   'A placeholder weapon',     103,        'COMMON', true,       '{}',             'WEAPON',   'SWORD',    0,  0,  10,   0,    0,    0),
('ARM_TEST_ARMOR',      'Test Armor',   'A placeholder armor',      125,        'COMMON', true,       '{}',             'ARMOR',    'MEDIUM',   0,  0,  0,    10,   0,    0),
('ACC_TEST_ACCESSORY',  'Test Bangle',  'A placeholder accessory',  221,        'COMMON', true,       '{"test": true}', 'ACCESSORY','BANGLE',   10, 10, 0,    0,    10,   0);

INSERT INTO Skills
(handle,        skill_name,         skill_description,      cost, effect) VALUES
('SKILL_TEST',  'Twiddle Thumbs',   'A placeholder skill',  1,    '{"test": true}');

INSERT INTO Classes
(handle,    class_name, class_description,            
hp,         mp,         str,        def,        mag,        spd,
hp_growth,  mp_growth,  str_growth, def_growth, mag_growth, spd_growth, 
skill_1,    skill_5,    skill_10,   skill_15,   skill_20,     
weapon_type,  armor_type, 
weapon,       armor,      accessory) VALUES
('CLASS_WARRIOR', 'Warrior',  'A placeholder description',  
100,  20, 50, 30, 10, 20,   
10,   3,  5,  4,  3,  4,          
'SKILL_TEST', 'SKILL_TEST', 'SKILL_TEST', 'SKILL_TEST', 'SKILL_TEST', 
'SWORD',  'MEDIUM',   
'WPN_TEST_SWORD', 'ARM_TEST_ARMOR', 'ACC_TEST_ACCESSORY');

-- todo: insert into fixed tables

INSERT INTO LoginUsers (username, user_password) VALUES 
('JOHN TEST','123456'), ('JIMMY TEST','123ABC');

INSERT INTO Scores (user_id, gameover_time, char_name, floor, total_exp, final_level, total_value) VALUES
(1, CURRENT_TIMESTAMP, 'Jim John', 6, 530, 4, 5000),
(1, CURRENT_TIMESTAMP, 'Mage #64.5', 5, 251, 5, 10000),
(2, CURRENT_TIMESTAMP, 'Broke Guy', 7, 310, 2, 250);

-- todo: preset gamestate