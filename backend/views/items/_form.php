<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Items $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="items-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'handle')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'item_description')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'gold_value')->textInput() ?>

    <?= $form->field($model, 'rarity')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'equipment')->textInput() ?>

    <?= $form->field($model, 'effect')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'equip_slot')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'equip_type')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'hp')->textInput() ?>

    <?= $form->field($model, 'mp')->textInput() ?>

    <?= $form->field($model, 'str')->textInput() ?>

    <?= $form->field($model, 'def')->textInput() ?>

    <?= $form->field($model, 'mag')->textInput() ?>

    <?= $form->field($model, 'spd')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
