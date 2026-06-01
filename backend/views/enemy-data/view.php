<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\EnemyData $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Enemy Datas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="enemy-data-view">

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
            'enemy_name',
            'is_boss',
            'starting_floor',
            'stopping_floor',
            'base_level',
            'max_level',
            'level_up_factor',
            'hp',
            'str',
            'def',
            'mag',
            'spd',
            'skill',
            'gold_dropped',
            'exp_dropped',
        ],
    ]) ?>

</div>
