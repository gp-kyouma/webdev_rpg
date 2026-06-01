<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\GameStates $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="game-states-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'user_id')->textInput() ?>

    <?= $form->field($model, 'floor')->textInput() ?>

    <?= $form->field($model, 'map_data')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'shop1_id')->textInput() ?>

    <?= $form->field($model, 'shop2_id')->textInput() ?>

    <?= $form->field($model, 'shop3_id')->textInput() ?>

    <?= $form->field($model, 'shop4_id')->textInput() ?>

    <?= $form->field($model, 'chest_id')->textInput() ?>

    <?= $form->field($model, 'is_mimic')->textInput() ?>

    <?= $form->field($model, 'boss_id')->textInput() ?>

    <?= $form->field($model, 'boss_level')->textInput() ?>

    <?= $form->field($model, 'char_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'current_hp')->textInput() ?>

    <?= $form->field($model, 'current_mp')->textInput() ?>

    <?= $form->field($model, 'max_hp')->textInput() ?>

    <?= $form->field($model, 'max_mp')->textInput() ?>

    <?= $form->field($model, 'str')->textInput() ?>

    <?= $form->field($model, 'def')->textInput() ?>

    <?= $form->field($model, 'mag')->textInput() ?>

    <?= $form->field($model, 'spd')->textInput() ?>

    <?= $form->field($model, 'exp')->textInput() ?>

    <?= $form->field($model, 'lvl')->textInput() ?>

    <?= $form->field($model, 'gold')->textInput() ?>

    <?= $form->field($model, 'class_id')->textInput() ?>

    <?= $form->field($model, 'skill_id')->textInput() ?>

    <?= $form->field($model, 'weapon_id')->textInput() ?>

    <?= $form->field($model, 'armor_id')->textInput() ?>

    <?= $form->field($model, 'accessory_id')->textInput() ?>

    <?= $form->field($model, 'item1_id')->textInput() ?>

    <?= $form->field($model, 'item2_id')->textInput() ?>

    <?= $form->field($model, 'item3_id')->textInput() ?>

    <?= $form->field($model, 'item4_id')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
