<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Scores".
 *
 * @property int $id
 * @property int $user_id
 * @property string $gameover_time
 * @property string $char_name
 * @property int $floor
 * @property int $total_exp
 * @property int $final_level
 * @property int $total_value
 *
 * @property LoginUsers $user
 */
class Scores extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Scores';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'char_name', 'floor', 'total_exp', 'final_level', 'total_value'], 'required'],
            [['user_id', 'floor', 'total_exp', 'final_level', 'total_value'], 'integer'],
            [['gameover_time'], 'safe'],
            [['char_name'], 'string', 'max' => 30],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => LoginUsers::class, 'targetAttribute' => ['user_id' => 'id']],
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
            'gameover_time' => 'Gameover Time',
            'char_name' => 'Char Name',
            'floor' => 'Floor',
            'total_exp' => 'Total Exp',
            'final_level' => 'Final Level',
            'total_value' => 'Total Value',
        ];
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

}
