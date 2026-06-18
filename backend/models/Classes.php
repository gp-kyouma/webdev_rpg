<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Classes".
 *
 * @property int $id
 * @property string $handle
 * @property string $class_name
 * @property string $class_description
 * @property int $hp
 * @property int $mp
 * @property int $str
 * @property int $def
 * @property int $mag
 * @property int $spd
 * @property int $hp_growth
 * @property int $mp_growth
 * @property int $str_growth
 * @property int $def_growth
 * @property int $mag_growth
 * @property int $spd_growth
 * @property string $skill_1
 * @property string $skill_5
 * @property string $skill_10
 * @property string $skill_15
 * @property string $skill_20
 * @property string $weapon_type
 * @property string $armor_type
 * @property string|null $weapon
 * @property string|null $armor
 * @property string|null $accessory
 * @property string|null $item1
 * @property string|null $item2
 * @property string|null $item3
 * @property string|null $item4
 *
 * @property Items $accessory0
 * @property Items $armor0
 * @property GameStates[] $gameStates
 * @property Items $item10
 * @property Items $item20
 * @property Items $item30
 * @property Items $item40
 * @property Skills $skill1
 * @property Skills $skill10
 * @property Skills $skill15
 * @property Skills $skill20
 * @property Skills $skill5
 * @property Items $weapon0
 */
class Classes extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Classes';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['weapon', 'armor', 'accessory', 'item1', 'item2', 'item3', 'item4'], 'default', 'value' => null],
            [['handle', 'class_name', 'class_description', 'hp', 'mp', 'str', 'def', 'mag', 'spd', 'hp_growth', 'mp_growth', 'str_growth', 'def_growth', 'mag_growth', 'spd_growth', 'skill_1', 'skill_5', 'skill_10', 'skill_15', 'skill_20', 'weapon_type', 'armor_type'], 'required'],
            [['hp', 'mp', 'str', 'def', 'mag', 'spd', 'hp_growth', 'mp_growth', 'str_growth', 'def_growth', 'mag_growth', 'spd_growth'], 'integer'],
            [['handle', 'class_name', 'skill_1', 'skill_5', 'skill_10', 'skill_15', 'skill_20', 'weapon', 'armor', 'accessory', 'item1', 'item2', 'item3', 'item4'], 'string', 'max' => 40],
            [['class_description'], 'string', 'max' => 100],
            [['weapon_type', 'armor_type'], 'string', 'max' => 10],
            [['handle'], 'unique'],
            [['skill_1'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_1' => 'handle']],
            [['item2'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item2' => 'handle']],
            [['item3'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item3' => 'handle']],
            [['item4'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item4' => 'handle']],
            [['skill_5'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_5' => 'handle']],
            [['skill_10'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_10' => 'handle']],
            [['skill_15'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_15' => 'handle']],
            [['skill_20'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill_20' => 'handle']],
            [['weapon'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['weapon' => 'handle']],
            [['armor'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['armor' => 'handle']],
            [['accessory'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['accessory' => 'handle']],
            [['item1'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['item1' => 'handle']],
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
            'class_name' => 'Class Name',
            'class_description' => 'Class Description',
            'hp' => 'Hp',
            'mp' => 'Mp',
            'str' => 'Str',
            'def' => 'Def',
            'mag' => 'Mag',
            'spd' => 'Spd',
            'hp_growth' => 'Hp Growth',
            'mp_growth' => 'Mp Growth',
            'str_growth' => 'Str Growth',
            'def_growth' => 'Def Growth',
            'mag_growth' => 'Mag Growth',
            'spd_growth' => 'Spd Growth',
            'skill_1' => 'Skill 1',
            'skill_5' => 'Skill 5',
            'skill_10' => 'Skill 10',
            'skill_15' => 'Skill 15',
            'skill_20' => 'Skill 20',
            'weapon_type' => 'Weapon Type',
            'armor_type' => 'Armor Type',
            'weapon' => 'Weapon',
            'armor' => 'Armor',
            'accessory' => 'Accessory',
            'item1' => 'Item1',
            'item2' => 'Item2',
            'item3' => 'Item3',
            'item4' => 'Item4',
        ];
    }

    /**
     * Gets query for [[Accessory0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAccessory0()
    {
        return $this->hasOne(Items::class, ['handle' => 'accessory']);
    }

    /**
     * Gets query for [[Armor0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getArmor0()
    {
        return $this->hasOne(Items::class, ['handle' => 'armor']);
    }

    /**
     * Gets query for [[GameStates]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates()
    {
        return $this->hasMany(GameStates::class, ['class_id' => 'id']);
    }

    /**
     * Gets query for [[Item10]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem10()
    {
        return $this->hasOne(Items::class, ['handle' => 'item1']);
    }

    /**
     * Gets query for [[Item20]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem20()
    {
        return $this->hasOne(Items::class, ['handle' => 'item2']);
    }

    /**
     * Gets query for [[Item30]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem30()
    {
        return $this->hasOne(Items::class, ['handle' => 'item3']);
    }

    /**
     * Gets query for [[Item40]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem40()
    {
        return $this->hasOne(Items::class, ['handle' => 'item4']);
    }

    /**
     * Gets query for [[Skill1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill1()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill_1']);
    }

    /**
     * Gets query for [[Skill10]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill10()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill_10']);
    }

    /**
     * Gets query for [[Skill15]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill15()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill_15']);
    }

    /**
     * Gets query for [[Skill20]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill20()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill_20']);
    }

    /**
     * Gets query for [[Skill5]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill5()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill_5']);
    }

    /**
     * Gets query for [[Weapon0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getWeapon0()
    {
        return $this->hasOne(Items::class, ['handle' => 'weapon']);
    }

    public function fields()
    {
        $fields = parent::fields();
        // Adiciona o nome do equipamento inicial diretamente no JSON
        $fields['weapon_name'] = function ($model) {
            return $model->weapon0 ? $model->weapon0->item_name : null;
        };
        $fields['armor_name'] = function ($model) {
            return $model->armor0 ? $model->armor0->item_name : null;
        };
        $fields['accessory_name'] = function ($model) {
            return $model->accessory0 ? $model->accessory0->item_name : null;
        };

        $fields['item1_name'] = function ($model) {
            return $model->item10 ? $model->item10->item_name : null;
        };
        $fields['item2_name'] = function ($model) {
            return $model->item20 ? $model->item20->item_name : null;
        };
        $fields['item3_name'] = function ($model) {
            return $model->item30 ? $model->item30->item_name : null;
        };
        $fields['item4_name'] = function ($model) {
            return $model->item40 ? $model->item40->item_name : null;
        };

        return $fields;
    }

}
