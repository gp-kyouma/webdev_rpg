<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\ClassesSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="classes-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'handle') ?>

    <?= $form->field($model, 'class_name') ?>

    <?= $form->field($model, 'class_description') ?>

    <?= $form->field($model, 'hp') ?>

    <?php // echo $form->field($model, 'mp') ?>

    <?php // echo $form->field($model, 'str') ?>

    <?php // echo $form->field($model, 'def') ?>

    <?php // echo $form->field($model, 'mag') ?>

    <?php // echo $form->field($model, 'spd') ?>

    <?php // echo $form->field($model, 'hp_growth') ?>

    <?php // echo $form->field($model, 'mp_growth') ?>

    <?php // echo $form->field($model, 'str_growth') ?>

    <?php // echo $form->field($model, 'def_growth') ?>

    <?php // echo $form->field($model, 'mag_growth') ?>

    <?php // echo $form->field($model, 'spd_growth') ?>

    <?php // echo $form->field($model, 'skill_1') ?>

    <?php // echo $form->field($model, 'skill_5') ?>

    <?php // echo $form->field($model, 'skill_10') ?>

    <?php // echo $form->field($model, 'skill_15') ?>

    <?php // echo $form->field($model, 'skill_20') ?>

    <?php // echo $form->field($model, 'weapon_type') ?>

    <?php // echo $form->field($model, 'armor_type') ?>

    <?php // echo $form->field($model, 'weapon') ?>

    <?php // echo $form->field($model, 'armor') ?>

    <?php // echo $form->field($model, 'accessory') ?>

    <?php // echo $form->field($model, 'item1') ?>

    <?php // echo $form->field($model, 'item2') ?>

    <?php // echo $form->field($model, 'item3') ?>

    <?php // echo $form->field($model, 'item4') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
