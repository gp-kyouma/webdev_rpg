<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Classes $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="classes-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'handle')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'class_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'class_description')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'hp')->textInput() ?>

    <?= $form->field($model, 'mp')->textInput() ?>

    <?= $form->field($model, 'str')->textInput() ?>

    <?= $form->field($model, 'def')->textInput() ?>

    <?= $form->field($model, 'mag')->textInput() ?>

    <?= $form->field($model, 'spd')->textInput() ?>

    <?= $form->field($model, 'hp_growth')->textInput() ?>

    <?= $form->field($model, 'mp_growth')->textInput() ?>

    <?= $form->field($model, 'str_growth')->textInput() ?>

    <?= $form->field($model, 'def_growth')->textInput() ?>

    <?= $form->field($model, 'mag_growth')->textInput() ?>

    <?= $form->field($model, 'spd_growth')->textInput() ?>

    <?= $form->field($model, 'skill_1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_5')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_10')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_15')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'skill_20')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'weapon_type')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'armor_type')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'weapon')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'armor')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'accessory')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item2')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item3')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item4')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
