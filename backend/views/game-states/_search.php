<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\GameStatesSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="game-states-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'user_id') ?>

    <?= $form->field($model, 'floor') ?>

    <?= $form->field($model, 'map_data') ?>

    <?= $form->field($model, 'shop1_id') ?>

    <?php // echo $form->field($model, 'shop2_id') ?>

    <?php // echo $form->field($model, 'shop3_id') ?>

    <?php // echo $form->field($model, 'shop4_id') ?>

    <?php // echo $form->field($model, 'chest_id') ?>

    <?php // echo $form->field($model, 'is_mimic') ?>

    <?php // echo $form->field($model, 'boss_id') ?>

    <?php // echo $form->field($model, 'boss_level') ?>

    <?php // echo $form->field($model, 'char_name') ?>

    <?php // echo $form->field($model, 'current_hp') ?>

    <?php // echo $form->field($model, 'current_mp') ?>

    <?php // echo $form->field($model, 'max_hp') ?>

    <?php // echo $form->field($model, 'max_mp') ?>

    <?php // echo $form->field($model, 'str') ?>

    <?php // echo $form->field($model, 'def') ?>

    <?php // echo $form->field($model, 'mag') ?>

    <?php // echo $form->field($model, 'spd') ?>

    <?php // echo $form->field($model, 'exp') ?>

    <?php // echo $form->field($model, 'lvl') ?>

    <?php // echo $form->field($model, 'gold') ?>

    <?php // echo $form->field($model, 'class_id') ?>

    <?php // echo $form->field($model, 'skill_id') ?>

    <?php // echo $form->field($model, 'weapon_id') ?>

    <?php // echo $form->field($model, 'armor_id') ?>

    <?php // echo $form->field($model, 'accessory_id') ?>

    <?php // echo $form->field($model, 'item1_id') ?>

    <?php // echo $form->field($model, 'item2_id') ?>

    <?php // echo $form->field($model, 'item3_id') ?>

    <?php // echo $form->field($model, 'item4_id') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
