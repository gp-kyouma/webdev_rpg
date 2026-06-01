<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\EnemyData $model */

$this->title = 'Create Enemy Data';
$this->params['breadcrumbs'][] = ['label' => 'Enemy Datas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="enemy-data-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
