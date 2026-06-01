<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class ClassesController extends ActiveController
{
 public $modelClass = 'app\models\Classes';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}