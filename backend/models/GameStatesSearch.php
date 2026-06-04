<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\GameStates;

/**
 * GameStatesSearch represents the model behind the search form of `app\models\GameStates`.
 */
class GameStatesSearch extends GameStates
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'floor', 'shop1_id', 'shop2_id', 'shop3_id', 'shop4_id', 'chest_id', 'is_mimic', 'boss_id', 'boss_level', 'current_hp', 'current_mp', 'max_hp', 'max_mp', 'str', 'def', 'mag', 'spd', 'exp', 'lvl', 'gold', 'class_id', 'skill_id', 'weapon_id', 'armor_id', 'accessory_id', 'item1_id', 'item2_id', 'item3_id', 'item4_id'], 'integer'],
            [['map_data', 'char_name'], 'safe'],
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
        $query = GameStates::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
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
            'floor' => $this->floor,
            'shop1_id' => $this->shop1_id,
            'shop2_id' => $this->shop2_id,
            'shop3_id' => $this->shop3_id,
            'shop4_id' => $this->shop4_id,
            'chest_id' => $this->chest_id,
            'is_mimic' => $this->is_mimic,
            'boss_id' => $this->boss_id,
            'boss_level' => $this->boss_level,
            'current_hp' => $this->current_hp,
            'current_mp' => $this->current_mp,
            'max_hp' => $this->max_hp,
            'max_mp' => $this->max_mp,
            'str' => $this->str,
            'def' => $this->def,
            'mag' => $this->mag,
            'spd' => $this->spd,
            'exp' => $this->exp,
            'lvl' => $this->lvl,
            'gold' => $this->gold,
            'class_id' => $this->class_id,
            'skill_id' => $this->skill_id,
            'weapon_id' => $this->weapon_id,
            'armor_id' => $this->armor_id,
            'accessory_id' => $this->accessory_id,
            'item1_id' => $this->item1_id,
            'item2_id' => $this->item2_id,
            'item3_id' => $this->item3_id,
            'item4_id' => $this->item4_id,
        ]);

        $query->andFilterWhere(['like', 'map_data', $this->map_data])
            ->andFilterWhere(['like', 'char_name', $this->char_name]);

        return $dataProvider;
    }
}
