<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\filters\Cors;
class LoginUsersController extends ActiveController
{
 public $modelClass = 'app\models\LoginUsers';
 public function behaviors()
 {
 $behaviors = parent::behaviors();

 $behaviors['corsFilter'] = [
 'class' => Cors::class,
 ];
 return $behaviors;
 }
}