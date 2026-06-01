<?php

use app\models\Scores;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\ScoresSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Scores';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="scores-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Scores', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'user_id',
            'gameover_time',
            'char_name',
            'floor',
            //'total_exp',
            //'final_level',
            //'total_value',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Scores $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
