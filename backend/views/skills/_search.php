<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\SkillsSearch $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="skills-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'handle') ?>

    <?= $form->field($model, 'skill_name') ?>

    <?= $form->field($model, 'skill_description') ?>

    <?= $form->field($model, 'cost') ?>

    <?php // echo $form->field($model, 'effect') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
