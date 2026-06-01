<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\EnemyData;

/**
 * EnemyDataSearch represents the model behind the search form of `app\models\EnemyData`.
 */
class EnemyDataSearch extends EnemyData
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'is_boss', 'starting_floor', 'stopping_floor', 'base_level', 'max_level', 'hp', 'str', 'def', 'mag', 'spd', 'gold_dropped', 'exp_dropped'], 'integer'],
            [['handle', 'enemy_name', 'skill'], 'safe'],
            [['level_up_factor'], 'number'],
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
        $query = EnemyData::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params, $formName);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'is_boss' => $this->is_boss,
            'starting_floor' => $this->starting_floor,
            'stopping_floor' => $this->stopping_floor,
            'base_level' => $this->base_level,
            'max_level' => $this->max_level,
            'level_up_factor' => $this->level_up_factor,
            'hp' => $this->hp,
            'str' => $this->str,
            'def' => $this->def,
            'mag' => $this->mag,
            'spd' => $this->spd,
            'gold_dropped' => $this->gold_dropped,
            'exp_dropped' => $this->exp_dropped,
        ]);

        $query->andFilterWhere(['like', 'handle', $this->handle])
            ->andFilterWhere(['like', 'enemy_name', $this->enemy_name])
            ->andFilterWhere(['like', 'skill', $this->skill]);

        return $dataProvider;
    }
}
