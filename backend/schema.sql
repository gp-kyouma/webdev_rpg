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
  handle varchar(40) UNIQUE NOT NULL, -- for access/reference, eg. 'WPN_IRON_SWORD'

  item_name varchar(40) NOT NULL,          -- actual display name, eg. 'Iron Sword'
  item_description varchar(100) NOT NULL,   -- flavortext

  gold_value INTEGER NOT NULL,
  rarity varchar(10) NOT NULL,      -- 'COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'
  equipment boolean NOT NULL,       -- if false then this item is a consumable
  effect varchar(100) DEFAULT NULL,  -- relevant json string, to be parsed at relevant times

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
  handle varchar(40) UNIQUE NOT NULL, -- for access/reference, eg. 'SKILL_FIRE_1'

  skill_name varchar(40) NOT NULL,          -- actual display name, eg. 'Fire'
  skill_description varchar(100) NOT NULL,   -- flavortext

  cost INTEGER NOT NULL,              -- mp cost (for players. enemies do not use mp)
  effect varchar(100) NOT NULL,        -- json string

  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--======================================================================================--

CREATE TABLE IF NOT EXISTS Classes (
  id INTEGER NOT NULL AUTO_INCREMENT,
  handle varchar(40) UNIQUE NOT NULL, -- for access/reference, eg. 'CLASS_WARRIOR'

  class_name varchar(40) NOT NULL,          -- actual display name, eg. 'Warrior'
  class_description varchar(100) NOT NULL,   -- flavortext

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
  skill_1 varchar(40) NOT NULL,
  skill_5 varchar(40) NOT NULL,
  skill_10 varchar(40) NOT NULL,
  skill_15 varchar(40) NOT NULL,
  skill_20 varchar(40) NOT NULL,

  -- 'default' weapon and armor types (used for loot generation)
  weapon_type varchar(10) NOT NULL, -- 'SWORD' / 'STAFF' / and so on
  armor_type varchar(10) NOT NULL,  -- 'LIGHT' / 'HEAVY' / and so on

  -- starting items (can be null)
  weapon varchar(40) DEFAULT NULL,
  armor varchar(40) DEFAULT NULL,
  accessory varchar(40) DEFAULT NULL,

  item1 varchar(40) DEFAULT NULL,
  item2 varchar(40) DEFAULT NULL,
  item3 varchar(40) DEFAULT NULL,
  item4 varchar(40) DEFAULT NULL,

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
  handle varchar(40) UNIQUE NOT NULL, -- for access/reference, eg. 'ENEMY_GIANT_RAT'

  enemy_name varchar(40) NOT NULL,    -- actual display name, eg. 'Giant Rat'

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

  skill varchar(40),

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

-- Items (weapons)
INSERT INTO Items
(handle,  item_name,  item_description, 
gold_value, rarity, equipment,  effect,
equip_slot, equip_type,
hp, mp, str,  def,  mag,  spd) VALUES

('WPN_BRONZE_SWORD',  'Bronze Sword', 'An average bronze sword.',
300,  'COMMON', true, '{}',
'WEAPON', 'SWORD',
0,  0,  8,  0,  0,  0),

('WPN_IRON_SWORD',  'Iron Sword', 'An easy to wield iron sword.',
670,  'COMMON', true, '{}',
'WEAPON', 'SWORD',
0,  0,  12, 0,  0,  0),

('WPN_STEEL_SWORD', 'Steel Sword',  'A durable and sharp steel sword.',
1480, 'UNCOMMON', true, '{}',
'WEAPON', 'SWORD',
0,  0,  18, 0,  0,  0),

('WPN_MYTHRIL_SWORD', 'Mythril Sword',  'A sword made of magical metal. [+50% extra damage against "Zombie" enemies]',
3890, 'RARE', true, '{"effective_damage": "Zombie"}',
'WEAPON', 'SWORD',
0,  0,  25, 0,  0,  0),

('WPN_BRAVE_SWORD', 'Brave Sword',  'An extremely light, extremely sharp sword. [+1 additional strike when Attacking]',
6970, 'LEGENDARY', true, '{"extra_attack": 1}',
'WEAPON', 'SWORD',
0,  0,  36, 0,  0,  0);

-- Items (armor)
INSERT INTO Items
(handle,  item_name,  item_description, 
gold_value, rarity, equipment,  effect,
equip_slot, equip_type,
hp, mp, str,  def,  mag,  spd) VALUES

('ARM_LEATHER_ARMOR', 'Leather Armor', 'A basic gambeson made of boiled leather.',
550,  'COMMON', true, '{}',
'ARMOR',  'MEDIUM',
0,  0,  0,  8,  0,  0),

('ARM_BRONZE_BREASTPLATE', 'Bronze Breastplate', 'A breastplate made of bronze.',
840,  'COMMON', true, '{}',
'ARMOR',  'MEDIUM',
0,  0,  0,  13, 0,  0),

('ARM_STEEL_BRIGANDINE', 'Steel Brigandine', 'An armor of heavy cloth, reinforced with steel plates.',
1280, 'UNCOMMON', true, '{}',
'ARMOR',  'MEDIUM',
0,  0,  0,  20, 0,  0),

('ARM_MYTHRIL_BREASTPLATE', 'Mythril Breastplate', 'A breastplate made of magical metal. [Reduces magical damage by 33%]',
2800, 'RARE', true, '{"reduce_mag_damage": 33}',
'ARMOR',  'MEDIUM',
0,  0,  0,  27, 0,  0),

('ARM_HEROIC_ARMOR', 'Heroic Armor', 'A set of armor belonging to a hero of legend. [At battle start, +1 Defense rank]',
4680, 'LEGENDARY', true, '{"defense_rank": 1}',
'ARMOR',  'MEDIUM',
0,  0,  0,  35, 0,  0);

-- Items (accessories)
INSERT INTO Items
(handle,  item_name,  item_description, 
gold_value, rarity, equipment,  effect,
equip_slot, equip_type,
hp, mp, str,  def,  mag,  spd) VALUES

('ACC_HEALTH_RING',  'Health Ring',  'A ring that increases vitality. [+150 Max HP]',
1000,  'COMMON', true, '{}',
'ACCESSORY',  'RING',
150,  0,  0,  0,  0,  0),

('ACC_MAGIC_BANGLE',  'Magic Bangle',  'A bangle that improves mana efficiency. [x0.8 MP cost for Skills]',
2200,  'UNCOMMON', true, '{"mp_cost_modifier": 0.8}',
'ACCESSORY',  'BANGLE',
0,  0,  0,  0,  10, 0),

('ACC_SYLPH_SHOES',  'Sylph Shoes',  'A pair of shoes blessed with wind magic. [+25% Attack dodge rate]',
4500,  'RARE', true, '{"extra_dodge": 25}',
'ACCESSORY',  'SHOES',
0,  0,  0,  0,  0,  10),

('ACC_CHAMPION_BELT',  'Champion Belt',  'A belt belonging to a champion of the gods. [At battle start, +1 ALL ranks]',
10000,  'LEGENDARY', true, '{"attack_rank": 1, "defense_rank": 1, "magic_rank": 1, "speed_rank": 1}',
'ACCESSORY',  'BELT',
200,  100,  10, 10, 10, 10);

-- Items (consumables)
INSERT INTO Items
(handle,  item_name,  item_description, 
gold_value, rarity, equipment,  effect) VALUES

('ITEM_RED_POTION',  'Red Potion',  'A potion that restores vitality. [Restores HP by 50%]',
200,  'COMMON', false,  '{"hp_restore_percent": 50}'),

('ITEM_GREEN_POTION',  'Green Potion',  'A potion that greatly restores vitality. [Fully restores HP]',
500,  'UNCOMMON', false,  '{"hp_restore_percent": 100}'),

('ITEM_GOLDEN_ELIXIR',  'Golden Elixir',  'A super-potion that fully revitalizes the user. [Fully restores HP and MP]',
1200, 'RARE', false,  '{"hp_restore_percent": 100, "mp_restore_percent": 100}'),

('ITEM_LUSTER_CANDY',  'Luster Candy',  'A mysterious, shining confection. [During battle, +1 ALL ranks]',
3000, 'LEGENDARY', false,  '{"battle_only": true, "attack_rank": 1, "defense_rank": 1, "magic_rank": 1, "speed_rank": 1}');

--TODO more items

-- Skills
INSERT INTO Skills
(handle,        skill_name,         skill_description,      cost, effect) VALUES

('SKILL_LUNGE','Lunge', "A stronger physical attack. [1.1x base physical damage]",  6,
'{"offense_modifier": 1.1, "attacks": 1}'),



('SKILL_PIERCE_ARMOR_1','Pierce Armor', "Weaken the enemy's defenses. [0.8x base physical damage, reduce enemy's Defense rank by 1]",  10,
'{"offense_modifier": 0.8, "attacks": 1, "enemy_rank": {"defense_rank": -1}}'),

('SKILL_PIERCE_ARMOR_2','Pierce Armor+', "Weaken the enemy's defenses. [1.0x base physical damage, reduce enemy's Defense rank by 1]",  20,
'{"offense_modifier": 1.0, "attacks": 1, "enemy_rank": {"defense_rank": -1}}'),

('SKILL_PIERCE_ARMOR_3','Pierce Armor++', "Weaken the enemy's defenses. [1.2x base physical damage, reduce enemy's Defense rank by 1]",  35,
'{"offense_modifier": 1.2, "attacks": 1, "enemy_rank": {"defense_rank": -1}}'),

('SKILL_PIERCE_ARMOR_4','Shred Armor', "Greatly weaken the enemy's defenses. [1.2x base physical damage, reduce enemy's Defense rank by 2]",  60,
'{"offense_modifier": 1.2, "attacks": 1, "enemy_rank": {"defense_rank": -2}}'),



('SKILL_FIRE','Fire', "A basic fireball attack. [1.5x base magical damage]",  15,
'{"magic": true, "offense_modifier": 1.5, "attacks": 1}'),

('SKILL_BLAZE','Blaze', "A stronger fireball variant. [2.5x base magical damage]",  30,
'{"magic": true, "offense_modifier": 2.5, "attacks": 1}'),

('SKILL_DUAL_BOLT','Dual Bolt', "Strikes the enemy twice with lightning. [2.0x base magical damage, 2 hits]",  45,
'{"magic": true, "offense_modifier": 2.0, "attacks": 2}'),

('SKILL_GRAVITY','Gravity', "Crush the enemy under their own weight. [3.5x base magical damage, adaptive damage]",  65,
'{"magic": true, "adaptive": true, "offense_modifier": 3.5, "attacks": 1}'),

('SKILL_STARSTORM','Starstorm', 'Shower the enemy with a barrage of star power. [3.0x base magical damage, 3 hits, adaptive damage]',  80,
'{"magic": true, "adaptive": true, "offense_modifier": 3.0, "attacks": 3}');

--TODO more

-- Classes
INSERT INTO Classes
(handle,    class_name, class_description,            
hp,         mp,         str,        def,        mag,        spd,
hp_growth,  mp_growth,  str_growth, def_growth, mag_growth, spd_growth, 
skill_1,    skill_5,    skill_10,   skill_15,   skill_20,     
weapon_type,  armor_type, 
weapon,       armor,      accessory,
item1, item2, item3, item4) VALUES
('CLASS_WARRIOR', 'Warrior',  'Your average hotheaded, danger-seeking adventurer. Skilled with swords and other physical weapons.',  
544,  41, 19, 17, 15, 29,   
74,   9,  2,  2,  1,  3,          
'SKILL_PIERCE_ARMOR_1', 'SKILL_PIERCE_ARMOR_2', 'SKILL_PIERCE_ARMOR_3', 'SKILL_PIERCE_ARMOR_3', 'SKILL_PIERCE_ARMOR_4', 
'SWORD',  'MEDIUM',   
'WPN_BRONZE_SWORD', 'ARM_LEATHER_ARMOR', null,
'ITEM_RED_POTION', null, null, null);

--TODO other classes

-- Enemy Data
INSERT INTO EnemyData
(handle,  enemy_name,
is_boss,  starting_floor, stopping_floor,
base_level, max_level,  level_up_factor,
hp, str,  def,  mag,  spd,  skill,
gold_dropped, exp_dropped) VALUES

('ENEMY_MIMIC', 'Mimic',
false,  -1,  null,
1,  null,  0.1,   
333,  25, 25, 25, 25, 'SKILL_LUNGE',
50, 25),

('ENEMY_GIANT_RAT', 'Giant Rat',
false,  1,  10,
1,  5,  0.05,   
200,  25, 20, 20, 20, 'SKILL_LUNGE',
10, 10),

('ENEMY_DUNGEON_ENT', 'Dungeon Ent',
true,  1,  20,
5,  15,  0.05,   
500,  30, 20, 30, 30, 'SKILL_FIRE',
50, 30);

--TODO more

-- Preset users
INSERT INTO LoginUsers (username, user_password) VALUES 
('JOHN TEST','123456'), ('JIMMY TEST','123ABC');

-- Preset scores
INSERT INTO Scores (user_id, gameover_time, char_name, floor, total_exp, final_level, total_value) VALUES
(1, CURRENT_TIMESTAMP, 'Jim John', 6, 530, 5, 5000),
(1, CURRENT_TIMESTAMP, 'Mage #64.5', 5, 251, 2, 10000),
(2, CURRENT_TIMESTAMP, 'Broke Guy', 7, 310, 3, 250);