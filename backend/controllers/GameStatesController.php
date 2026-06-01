<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class GameStatesController extends ActiveController
{
 public $modelClass = 'app\models\GameStates';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}