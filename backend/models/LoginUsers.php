<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "LoginUsers".
 *
 * @property int $id
 * @property string $username
 * @property string $user_password
 *
 * @property GameStates[] $gameStates
 * @property Scores[] $scores
 */
class LoginUsers extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'LoginUsers';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'user_password'], 'required'],
            [['username', 'user_password'], 'string', 'max' => 128],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'user_password' => 'User Password',
        ];
    }

    /**
     * Gets query for [[GameStates]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGameStates()
    {
        return $this->hasMany(GameStates::class, ['user_id' => 'id']);
    }

    /**
     * Gets query for [[Scores]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getScores()
    {
        return $this->hasMany(Scores::class, ['user_id' => 'id']);
    }

}
