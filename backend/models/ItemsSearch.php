<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Items;

/**
 * ItemsSearch represents the model behind the search form of `app\models\Items`.
 */
class ItemsSearch extends Items
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'gold_value', 'equipment', 'hp', 'mp', 'str', 'def', 'mag', 'spd'], 'integer'],
            [['handle', 'item_name', 'item_description', 'rarity', 'effect', 'equip_slot', 'equip_type'], 'safe'],
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
        $query = Items::find();

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
            'gold_value' => $this->gold_value,
            'equipment' => $this->equipment,
            'hp' => $this->hp,
            'mp' => $this->mp,
            'str' => $this->str,
            'def' => $this->def,
            'mag' => $this->mag,
            'spd' => $this->spd,
        ]);

        $query->andFilterWhere(['handle' => $this->handle]);

        $query->andFilterWhere(['rarity' => $this->rarity]);
        $query->andFilterWhere(['equip_slot' => $this->equip_slot]);
        $query->andFilterWhere(['equip_type' => $this->equip_type]);

        $query->andFilterWhere(['like', 'item_name', $this->item_name])
            ->andFilterWhere(['like', 'item_description', $this->item_description])
            ->andFilterWhere(['like', 'effect', $this->effect]);

        return $dataProvider;
    }
}
