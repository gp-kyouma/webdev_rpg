<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class ScoresController extends ActiveController
{
 public $modelClass = 'app\models\Scores';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}