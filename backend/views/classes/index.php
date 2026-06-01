<?php

use app\models\Classes;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var app\models\ClassesSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Classes';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="classes-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Classes', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'handle',
            'class_name',
            'class_description',
            'hp',
            //'mp',
            //'str',
            //'def',
            //'mag',
            //'spd',
            //'hp_growth',
            //'mp_growth',
            //'str_growth',
            //'def_growth',
            //'mag_growth',
            //'spd_growth',
            //'skill_1',
            //'skill_5',
            //'skill_10',
            //'skill_15',
            //'skill_20',
            //'weapon_type',
            //'armor_type',
            //'weapon',
            //'armor',
            //'accessory',
            //'item1',
            //'item2',
            //'item3',
            //'item4',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Classes $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
