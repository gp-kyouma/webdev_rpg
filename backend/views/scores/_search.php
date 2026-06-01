<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\ScoresSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="scores-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'user_id') ?>

    <?= $form->field($model, 'gameover_time') ?>

    <?= $form->field($model, 'char_name') ?>

    <?= $form->field($model, 'floor') ?>

    <?php // echo $form->field($model, 'total_exp') ?>

    <?php // echo $form->field($model, 'final_level') ?>

    <?php // echo $form->field($model, 'total_value') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
