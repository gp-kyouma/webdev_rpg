<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\ItemsSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="items-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'handle') ?>

    <?= $form->field($model, 'item_name') ?>

    <?= $form->field($model, 'item_description') ?>

    <?= $form->field($model, 'gold_value') ?>

    <?php // echo $form->field($model, 'rarity') ?>

    <?php // echo $form->field($model, 'equipment') ?>

    <?php // echo $form->field($model, 'effect') ?>

    <?php // echo $form->field($model, 'equip_slot') ?>

    <?php // echo $form->field($model, 'equip_type') ?>

    <?php // echo $form->field($model, 'hp') ?>

    <?php // echo $form->field($model, 'mp') ?>

    <?php // echo $form->field($model, 'str') ?>

    <?php // echo $form->field($model, 'def') ?>

    <?php // echo $form->field($model, 'mag') ?>

    <?php // echo $form->field($model, 'spd') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
