<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Skills $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="skills-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'handle')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_description')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'cost')->textInput() ?>

    <?= $form->field($model, 'effect')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
