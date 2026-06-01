<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\GameStates $model */

$this->title = 'Update Game States: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Game States', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="game-states-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
