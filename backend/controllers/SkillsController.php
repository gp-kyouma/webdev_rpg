<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class SkillsController extends ActiveController
{
 public $modelClass = 'app\models\Skills';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}