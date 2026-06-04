<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Scores;

/**
 * ScoresSearch represents the model behind the search form of `app\models\Scores`.
 */
class ScoresSearch extends Scores
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'floor', 'total_exp', 'final_level', 'total_value'], 'integer'],
            [['gameover_time', 'char_name'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     * @param string|null $formName Form name to be used into `->load()` method.
     *
     * @return ActiveDataProvider
     */
    public function search($params, $formName = null)
    {
        $query = Scores::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            //custom sorting for score table
            'sort' => ['defaultOrder' => [
                'floor' => SORT_DESC,
                'total_exp' => SORT_DESC,
                'total_value' => SORT_DESC,
                'gameover_time' => SORT_ASC,
            ],]
        ]);

        //$this->load($params, $formName);
        $this->load($params, '');

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'user_id' => $this->user_id,
            'gameover_time' => $this->gameover_time,
            'floor' => $this->floor,
            'total_exp' => $this->total_exp,
            'final_level' => $this->final_level,
            'total_value' => $this->total_value,
        ]);

        $query->andFilterWhere(['like', 'char_name', $this->char_name]);

        return $dataProvider;
    }
}
