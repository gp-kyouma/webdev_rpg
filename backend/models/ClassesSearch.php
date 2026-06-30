<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Classes;

/**
 * ClassesSearch represents the model behind the search form of `app\models\Classes`.
 */
class ClassesSearch extends Classes
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'hp', 'mp', 'str', 'def', 'mag', 'spd', 'hp_growth', 'mp_growth', 'str_growth', 'def_growth', 'mag_growth', 'spd_growth'], 'integer'],
            [['handle', 'class_name', 'class_description', 'skill_1', 'skill_5', 'skill_10', 'skill_15', 'skill_20', 'weapon_type', 'armor_type', 'weapon', 'armor', 'accessory', 'item1', 'item2', 'item3', 'item4'], 'safe'],
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
        $query = Classes::find();

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
            'hp' => $this->hp,
            'mp' => $this->mp,
            'str' => $this->str,
            'def' => $this->def,
            'mag' => $this->mag,
            'spd' => $this->spd,
            'hp_growth' => $this->hp_growth,
            'mp_growth' => $this->mp_growth,
            'str_growth' => $this->str_growth,
            'def_growth' => $this->def_growth,
            'mag_growth' => $this->mag_growth,
            'spd_growth' => $this->spd_growth,
        ]);

        $query->andFilterWhere(['handle' => $this->handle]);

        $query->andFilterWhere(['like', 'class_name', $this->class_name])
            ->andFilterWhere(['like', 'class_description', $this->class_description])
            ->andFilterWhere(['like', 'skill_1', $this->skill_1])
            ->andFilterWhere(['like', 'skill_5', $this->skill_5])
            ->andFilterWhere(['like', 'skill_10', $this->skill_10])
            ->andFilterWhere(['like', 'skill_15', $this->skill_15])
            ->andFilterWhere(['like', 'skill_20', $this->skill_20])
            ->andFilterWhere(['like', 'weapon_type', $this->weapon_type])
            ->andFilterWhere(['like', 'armor_type', $this->armor_type])
            ->andFilterWhere(['like', 'weapon', $this->weapon])
            ->andFilterWhere(['like', 'armor', $this->armor])
            ->andFilterWhere(['like', 'accessory', $this->accessory])
            ->andFilterWhere(['like', 'item1', $this->item1])
            ->andFilterWhere(['like', 'item2', $this->item2])
            ->andFilterWhere(['like', 'item3', $this->item3])
            ->andFilterWhere(['like', 'item4', $this->item4]);

        return $dataProvider;
    }
}
