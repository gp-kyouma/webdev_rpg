<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Scores $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="scores-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'user_id')->textInput() ?>

    <?= $form->field($model, 'gameover_time')->textInput() ?>

    <?= $form->field($model, 'char_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'floor')->textInput() ?>

    <?= $form->field($model, 'total_exp')->textInput() ?>

    <?= $form->field($model, 'final_level')->textInput() ?>

    <?= $form->field($model, 'total_value')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
