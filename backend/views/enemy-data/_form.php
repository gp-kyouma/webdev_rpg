<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\EnemyData $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="enemy-data-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'handle')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'enemy_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'is_boss')->textInput() ?>

    <?= $form->field($model, 'starting_floor')->textInput() ?>

    <?= $form->field($model, 'stopping_floor')->textInput() ?>

    <?= $form->field($model, 'base_level')->textInput() ?>

    <?= $form->field($model, 'max_level')->textInput() ?>

    <?= $form->field($model, 'level_up_factor')->textInput() ?>

    <?= $form->field($model, 'hp')->textInput() ?>

    <?= $form->field($model, 'str')->textInput() ?>

    <?= $form->field($model, 'def')->textInput() ?>

    <?= $form->field($model, 'mag')->textInput() ?>

    <?= $form->field($model, 'spd')->textInput() ?>

    <?= $form->field($model, 'skill')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'gold_dropped')->textInput() ?>

    <?= $form->field($model, 'exp_dropped')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
