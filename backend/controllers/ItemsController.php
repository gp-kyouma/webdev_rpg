<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class ItemsController extends ActiveController
{
 public $modelClass = 'app\models\Items';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}