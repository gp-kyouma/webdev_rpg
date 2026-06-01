<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\EnemyDataSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="enemy-data-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'handle') ?>

    <?= $form->field($model, 'enemy_name') ?>

    <?= $form->field($model, 'is_boss') ?>

    <?= $form->field($model, 'starting_floor') ?>

    <?php // echo $form->field($model, 'stopping_floor') ?>

    <?php // echo $form->field($model, 'base_level') ?>

    <?php // echo $form->field($model, 'max_level') ?>

    <?php // echo $form->field($model, 'level_up_factor') ?>

    <?php // echo $form->field($model, 'hp') ?>

    <?php // echo $form->field($model, 'str') ?>

    <?php // echo $form->field($model, 'def') ?>

    <?php // echo $form->field($model, 'mag') ?>

    <?php // echo $form->field($model, 'spd') ?>

    <?php // echo $form->field($model, 'skill') ?>

    <?php // echo $form->field($model, 'gold_dropped') ?>

    <?php // echo $form->field($model, 'exp_dropped') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
