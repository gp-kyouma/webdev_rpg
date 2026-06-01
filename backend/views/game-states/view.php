<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var app\models\GameStates $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Game States', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="game-states-view">

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
            'user_id',
            'floor',
            'map_data',
            'shop1_id',
            'shop2_id',
            'shop3_id',
            'shop4_id',
            'chest_id',
            'is_mimic',
            'boss_id',
            'boss_level',
            'char_name',
            'current_hp',
            'current_mp',
            'max_hp',
            'max_mp',
            'str',
            'def',
            'mag',
            'spd',
            'exp',
            'lvl',
            'gold',
            'class_id',
            'skill_id',
            'weapon_id',
            'armor_id',
            'accessory_id',
            'item1_id',
            'item2_id',
            'item3_id',
            'item4_id',
        ],
    ]) ?>

</div>
