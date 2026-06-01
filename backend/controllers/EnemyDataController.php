<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class EnemyDataController extends ActiveController
{
 public $modelClass = 'app\models\EnemyData';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}