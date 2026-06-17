<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Items".
 *
 * @property int $id
 * @property string $handle
 * @property string $item_name
 * @property string $item_description
 * @property int $gold_value
 * @property string $rarity
 * @property int $equipment
 * @property string|null $effect
 * @property string|null $equip_slot
 * @property string|null $equip_type
 * @property int|null $hp
 * @property int|null $mp
 * @property int|null $str
 * @property int|null $def
 * @property int|null $mag
 * @property int|null $spd
 *
 * @property Classes[] $classes
 * @property Classes[] $classes0
 * @property Classes[] $classes1
 * @property Classes[] $classes2
 * @property Classes[] $classes3
 * @property Classes[] $classes4
 * @property Classes[] $classes5
 * @property GameStates[] $gameStates
 * @property GameStates[] $gameStates0
 * @property GameStates[] $gameStates1
 * @property GameStates[] $gameStates10
 * @property GameStates[] $gameStates2
 * @property GameStates[] $gameStates3
 * @property GameStates[] $gameStates4
 * @property GameStates[] $gameStates5
 * @property GameStates[] $gameStates6
 * @property GameStates[] $gameStates7
 * @property GameStates[] $gameStates8
 * @property GameStates[] $gameStates9
 */
class Items extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Items';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['effect', 'equip_slot', 'equip_type', 'hp', 'mp', 'str', 'def', 'mag', 'spd'], 'default', 'value' => null],
            [['handle', 'item_name', 'item_description', 'gold_value', 'rarity', 'equipment'], 'required'],
            [['gold_value', 'equipment', 'hp', 'mp', 'str', 'def', 'mag', 'spd'], 'integer'],
            [['handle', 'item_name'], 'string', 'max' => 40],
            [['item_description', 'effect'], 'string', 'max' => 100],
            [['rarity', 'equip_slot', 'equip_type'], 'string', 'max' => 10],
            [['handle'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'handle' => 'Handle',
            'item_name' => 'Item Name',
            'item_description' => 'Item Description',
            'gold_value' => 'Gold Value',
            'rarity' => 'Rarity',
            'equipment' => 'Equipment',
            'effect' => 'Effect',
            'equip_slot' => 'Equip Slot',
            'equip_type' => 'Equip Type',
            'hp' => 'Hp',
            'mp' => 'Mp',
            'str' => 'Str',
            'def' => 'Def',
            'mag' => 'Mag',
            'spd' => 'Spd',
        ];
    }

    /**
     * Gets query for [[Classes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses()
    {
        return $this->hasMany(Classes::class, ['item2' => 'handle']);
    }

    /**
     * Gets query for [[Classes0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses0()
    {
        return $this->hasMany(Classes::class, ['item3' => 'handle']);
    }

    /**
     * Gets query for [[Classes1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses1()
    {
        return $this->hasMany(Classes::class, ['item4' => 'handle']);
    }

    /**
     * Gets query for [[Classes2]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses2()
    {
        return $this->hasMany(Classes::class, ['weapon' => 'handle']);
    }

    /**
     * Gets query for [[Classes3]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses3()
    {
        return $this->hasMany(Classes::class, ['armor' => 'handle']);
    }

    /**
     * Gets query for [[Classes4]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses4()
    {
        return $this->hasMany(Classes::class, ['accessory' => 'handle']);
    }

    /**
     * Gets query for [[Classes5]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses5()
    {
        return $this->hasMany(Classes::class, ['item1' => 'handle']);
    }

    /**
     * Gets query for [[GameStates]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates()
    {
        return $this->hasMany(GameStates::class, ['weapon_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates0()
    {
        return $this->hasMany(GameStates::class, ['armor_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates1()
    {
        return $this->hasMany(GameStates::class, ['accessory_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates10]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates10()
    {
        return $this->hasMany(GameStates::class, ['chest_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates2]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates2()
    {
        return $this->hasMany(GameStates::class, ['item1_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates3]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates3()
    {
        return $this->hasMany(GameStates::class, ['item2_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates4]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates4()
    {
        return $this->hasMany(GameStates::class, ['item3_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates5]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates5()
    {
        return $this->hasMany(GameStates::class, ['item4_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates6]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates6()
    {
        return $this->hasMany(GameStates::class, ['shop1_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates7]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates7()
    {
        return $this->hasMany(GameStates::class, ['shop2_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates8]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates8()
    {
        return $this->hasMany(GameStates::class, ['shop3_id' => 'id']);
    }

    /**
     * Gets query for [[GameStates9]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates9()
    {
        return $this->hasMany(GameStates::class, ['shop4_id' => 'id']);
    }

}
