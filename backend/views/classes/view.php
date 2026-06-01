<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\Classes $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Classes', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="classes-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'handle',
            'class_name',
            'class_description',
            'hp',
            'mp',
            'str',
            'def',
            'mag',
            'spd',
            'hp_growth',
            'mp_growth',
            'str_growth',
            'def_growth',
            'mag_growth',
            'spd_growth',
            'skill_1',
            'skill_5',
            'skill_10',
            'skill_15',
            'skill_20',
            'weapon_type',
            'armor_type',
            'weapon',
            'armor',
            'accessory',
            'item1',
            'item2',
            'item3',
            'item4',
        ],
    ]) ?>

</div>
