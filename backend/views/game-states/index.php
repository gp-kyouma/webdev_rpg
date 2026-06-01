<?php

use app\models\GameStates;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\GameStatesSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Game States';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="game-states-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Game States', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'user_id',
            'floor',
            'map_data',
            'shop1_id',
            //'shop2_id',
            //'shop3_id',
            //'shop4_id',
            //'chest_id',
            //'is_mimic',
            //'boss_id',
            //'boss_level',
            //'char_name',
            //'current_hp',
            //'current_mp',
            //'max_hp',
            //'max_mp',
            //'str',
            //'def',
            //'mag',
            //'spd',
            //'exp',
            //'lvl',
            //'gold',
            //'class_id',
            //'skill_id',
            //'weapon_id',
            //'armor_id',
            //'accessory_id',
            //'item1_id',
            //'item2_id',
            //'item3_id',
            //'item4_id',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, GameStates $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
