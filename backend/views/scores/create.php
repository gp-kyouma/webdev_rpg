<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Scores $model */

$this->title = 'Create Scores';
$this->params['breadcrumbs'][] = ['label' => 'Scores', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="scores-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
