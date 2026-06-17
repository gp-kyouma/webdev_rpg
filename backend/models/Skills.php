<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Skills".
 *
 * @property int $id
 * @property string $handle
 * @property string $skill_name
 * @property string $skill_description
 * @property int $cost
 * @property string $effect
 *
 * @property Classes[] $classes
 * @property Classes[] $classes0
 * @property Classes[] $classes1
 * @property Classes[] $classes2
 * @property Classes[] $classes3
 * @property EnemyData[] $enemyDatas
 * @property GameStates[] $gameStates
 */
class Skills extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Skills';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['handle', 'skill_name', 'skill_description', 'cost', 'effect'], 'required'],
            [['cost'], 'integer'],
            [['handle', 'skill_name'], 'string', 'max' => 40],
            [['skill_description', 'effect'], 'string', 'max' => 100],
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
            'skill_name' => 'Skill Name',
            'skill_description' => 'Skill Description',
            'cost' => 'Cost',
            'effect' => 'Effect',
        ];
    }

    /**
     * Gets query for [[Classes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses()
    {
        return $this->hasMany(Classes::class, ['skill_1' => 'handle']);
    }

    /**
     * Gets query for [[Classes0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses0()
    {
        return $this->hasMany(Classes::class, ['skill_5' => 'handle']);
    }

    /**
     * Gets query for [[Classes1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses1()
    {
        return $this->hasMany(Classes::class, ['skill_10' => 'handle']);
    }

    /**
     * Gets query for [[Classes2]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses2()
    {
        return $this->hasMany(Classes::class, ['skill_15' => 'handle']);
    }

    /**
     * Gets query for [[Classes3]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClasses3()
    {
        return $this->hasMany(Classes::class, ['skill_20' => 'handle']);
    }

    /**
     * Gets query for [[EnemyDatas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEnemyDatas()
    {
        return $this->hasMany(EnemyData::class, ['skill' => 'handle']);
    }

    /**
     * Gets query for [[GameStates]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates()
    {
        return $this->hasMany(GameStates::class, ['skill_id' => 'id']);
    }

}
