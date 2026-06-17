<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "EnemyData".
 *
 * @property int $id
 * @property string $handle
 * @property string $enemy_name
 * @property int $is_boss
 * @property int $starting_floor
 * @property int|null $stopping_floor
 * @property int $base_level
 * @property int|null $max_level
 * @property float $level_up_factor
 * @property int $hp
 * @property int $str
 * @property int $def
 * @property int $mag
 * @property int $spd
 * @property string|null $skill
 * @property int $gold_dropped
 * @property int $exp_dropped
 *
 * @property GameStates[] $gameStates
 * @property Skills $skill0
 */
class EnemyData extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'EnemyData';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['stopping_floor', 'max_level', 'skill'], 'default', 'value' => null],
            [['handle', 'enemy_name', 'is_boss', 'starting_floor', 'base_level', 'level_up_factor', 'hp', 'str', 'def', 'mag', 'spd', 'gold_dropped', 'exp_dropped'], 'required'],
            [['is_boss', 'starting_floor', 'stopping_floor', 'base_level', 'max_level', 'hp', 'str', 'def', 'mag', 'spd', 'gold_dropped', 'exp_dropped'], 'integer'],
            [['level_up_factor'], 'number'],
            [['handle', 'enemy_name', 'skill'], 'string', 'max' => 40],
            [['handle'], 'unique'],
            [['skill'], 'exist', 'skipOnError' => true, 'targetClass' => Skills::class, 'targetAttribute' => ['skill' => 'handle']],
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
            'enemy_name' => 'Enemy Name',
            'is_boss' => 'Is Boss',
            'starting_floor' => 'Starting Floor',
            'stopping_floor' => 'Stopping Floor',
            'base_level' => 'Base Level',
            'max_level' => 'Max Level',
            'level_up_factor' => 'Level Up Factor',
            'hp' => 'Hp',
            'str' => 'Str',
            'def' => 'Def',
            'mag' => 'Mag',
            'spd' => 'Spd',
            'skill' => 'Skill',
            'gold_dropped' => 'Gold Dropped',
            'exp_dropped' => 'Exp Dropped',
        ];
    }

    /**
     * Gets query for [[GameStates]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates()
    {
        return $this->hasMany(GameStates::class, ['boss_id' => 'id']);
    }

    /**
     * Gets query for [[Skill0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSkill0()
    {
        return $this->hasOne(Skills::class, ['handle' => 'skill']);
    }

}
