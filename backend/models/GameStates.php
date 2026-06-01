<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "GameStates".
 *
 * @property int $id
 * @property int $user_id
 * @property int $floor
 * @property string $map_data
 * @property int|null $shop1_id
 * @property int|null $shop2_id
 * @property int|null $shop3_id
 * @property int|null $shop4_id
 * @property int|null $chest_id
 * @property int $is_mimic
 * @property int|null $boss_id
 * @property int $boss_level
 * @property string $char_name
 * @property int $current_hp
 * @property int $current_mp
 * @property int $max_hp
 * @property int $max_mp
 * @property int $str
 * @property int $def
 * @property int $mag
 * @property int $spd
 * @property int $exp
 * @property int $lvl
 * @property int $gold
 * @property int $class_id
 * @property int $skill_id
 * @property int|null $weapon_id
 * @property int|null $armor_id
 * @property int|null $accessory_id
 * @property int|null $item1_id
 * @property int|null $item2_id
 * @property int|null $item3_id
 * @property int|null $item4_id
 *
 * @property Items $accessory
 * @property Items $armor
 * @property EnemyData $boss
 * @property Items $chest
 * @property Classes $class
 * @property Items $item1
 * @property Items $item2
 * @property Items $item3
 * @property Items $item4
 * @property Items $shop1
 * @property Items $shop2
 * @property Items $shop3
 * @property Items $shop4
 * @property Skills $skill
 * @property LoginUsers $user
 * @property Items $weapon
 */
class GameStates extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'GameStates';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['shop1_id', 'shop2_id', 'shop3_id', 'shop4_id', 'chest_id', 'boss_id', 'weapon_id', 'armor_id', 'accessory_id', 'item1_id', 'item2_id', 'item3_id', 'item4_id'], 'default', 'value' => null],
            [['user_id', 'floor', 'map_data', 'is_mimic', 'boss_level', 'char_name', 'current_hp', 'current_mp', 'max_hp', 'max_mp', 'str', 'def', 'mag', 'spd', 'exp', 'lvl', 'gold', 'class_id', 'skill_id'], 'required'],
            [['user_id', 'floor', 'shop1_id', 'shop2_id', 'shop3_id', 'shop4_id', 'chest_id', 'is_mimic', 'boss_id', 'boss_level', 'current_hp', 'current_mp', 'max_hp', 'max_mp', 'str', 'def', 'mag', 'spd', 'exp', 'lvl', 'gold', 'class_id', 'skill_id', 'weapon_id', 'armor_id', 'accessory_id', 'item1_id', 'item2_id', 'item3_id', 'item4_id'], 'integer'],
            [['map_data'], 'string', 'max' => 100],
            [['char_name'], 'string', 'max' => 30],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => LoginUsers::class, 'targetAttribute' => ['user_id' => 'id']],
            [['weapon_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['weapon_id' => 'id']],
            [['armor_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['armor_id' => 'id']],
            [['accessory_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['accessory_id' => 'id']],
            [['item1_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item1_id' => 'id']],
            [['item2_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item2_id' => 'id']],
            [['item3_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item3_id' => 'id']],
            [['item4_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item4_id' => 'id']],
            [['shop1_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['shop1_id' => 'id']],
            [['shop2_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['shop2_id' => 'id']],
            [['shop3_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['shop3_id' => 'id']],
            [['shop4_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['shop4_id' => 'id']],
            [['chest_id'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['chest_id' => 'id']],
            [['boss_id'], 'exist', 'skipOnError' => true, 'targetClass' => EnemyData::class, 'targetAttribute' => ['boss_id' => 'id']],
            [['class_id'], 'exist', 'skipOnError' => true, 'targetClass' => Classes::class, 'targetAttribute' => ['class_id' => 'id']],
            [['skill_id'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'floor' => 'Floor',
            'map_data' => 'Map Data',
            'shop1_id' => 'Shop1 ID',
            'shop2_id' => 'Shop2 ID',
            'shop3_id' => 'Shop3 ID',
            'shop4_id' => 'Shop4 ID',
            'chest_id' => 'Chest ID',
            'is_mimic' => 'Is Mimic',
            'boss_id' => 'Boss ID',
            'boss_level' => 'Boss Level',
            'char_name' => 'Char Name',
            'current_hp' => 'Current Hp',
            'current_mp' => 'Current Mp',
            'max_hp' => 'Max Hp',
            'max_mp' => 'Max Mp',
            'str' => 'Str',
            'def' => 'Def',
            'mag' => 'Mag',
            'spd' => 'Spd',
            'exp' => 'Exp',
            'lvl' => 'Lvl',
            'gold' => 'Gold',
            'class_id' => 'Class ID',
            'skill_id' => 'Skill ID',
            'weapon_id' => 'Weapon ID',
            'armor_id' => 'Armor ID',
            'accessory_id' => 'Accessory ID',
            'item1_id' => 'Item1 ID',
            'item2_id' => 'Item2 ID',
            'item3_id' => 'Item3 ID',
            'item4_id' => 'Item4 ID',
        ];
    }

    /**
     * Gets query for [[Accessory]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAccessory()
    {
        return $this->hasOne(Items::class, ['id' => 'accessory_id']);
    }

    /**
     * Gets query for [[Armor]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getArmor()
    {
        return $this->hasOne(Items::class, ['id' => 'armor_id']);
    }

    /**
     * Gets query for [[Boss]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBoss()
    {
        return $this->hasOne(EnemyData::class, ['id' => 'boss_id']);
    }

    /**
     * Gets query for [[Chest]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getChest()
    {
        return $this->hasOne(Items::class, ['id' => 'chest_id']);
    }

    /**
     * Gets query for [[Class]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClass()
    {
        return $this->hasOne(Classes::class, ['id' => 'class_id']);
    }

    /**
     * Gets query for [[Item1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem1()
    {
        return $this->hasOne(Items::class, ['id' => 'item1_id']);
    }

    /**
     * Gets query for [[Item2]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem2()
    {
        return $this->hasOne(Items::class, ['id' => 'item2_id']);
    }

    /**
     * Gets query for [[Item3]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem3()
    {
        return $this->hasOne(Items::class, ['id' => 'item3_id']);
    }

    /**
     * Gets query for [[Item4]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem4()
    {
        return $this->hasOne(Items::class, ['id' => 'item4_id']);
    }

    /**
     * Gets query for [[Shop1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getShop1()
    {
        return $this->hasOne(Items::class, ['id' => 'shop1_id']);
    }

    /**
     * Gets query for [[Shop2]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getShop2()
    {
        return $this->hasOne(Items::class, ['id' => 'shop2_id']);
    }

    /**
     * Gets query for [[Shop3]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getShop3()
    {
        return $this->hasOne(Items::class, ['id' => 'shop3_id']);
    }

    /**
     * Gets query for [[Shop4]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getShop4()
    {
        return $this->hasOne(Items::class, ['id' => 'shop4_id']);
    }

    /**
     * Gets query for [[Skill]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill()
    {
        return $this->hasOne(Skills::class, ['id' => 'skill_id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(LoginUsers::class, ['id' => 'user_id']);
    }

    /**
     * Gets query for [[Weapon]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getWeapon()
    {
        return $this->hasOne(Items::class, ['id' => 'weapon_id']);
    }

}
