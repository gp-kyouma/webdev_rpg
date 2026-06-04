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
 //https://stackoverflow.com/questions/25522462/yii2-rest-query
 public function actions() {

    $actions = parent::actions();
    $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

    return $actions;
}

public function prepareDataProvider() {

    $searchModel = new \app\models\LoginUsersSearch();
    return $searchModel->search(\Yii::$app->request->queryParams);
}
}