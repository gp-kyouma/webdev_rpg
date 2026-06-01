<?php

use app\models\EnemyData;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\EnemyDataSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Enemy Datas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="enemy-data-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Enemy Data', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'handle',
            'enemy_name',
            'is_boss',
            'starting_floor',
            //'stopping_floor',
            //'base_level',
            //'max_level',
            //'level_up_factor',
            //'hp',
            //'str',
            //'def',
            //'mag',
            //'spd',
            //'skill',
            //'gold_dropped',
            //'exp_dropped',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, EnemyData $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
