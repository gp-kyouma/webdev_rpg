<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\LoginUsers $model */

$this->title = 'Create Login Users';
$this->params['breadcrumbs'][] = ['label' => 'Login Users', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="login-users-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
