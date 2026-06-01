<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\EnemyData $model */

$this->title = 'Update Enemy Data: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Enemy Datas', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="enemy-data-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
