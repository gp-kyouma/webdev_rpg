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
 //https://stackoverflow.com/questions/25522462/yii2-rest-query
 public function actions() {

    $actions = parent::actions();
    $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

    return $actions;
}

public function prepareDataProvider() {

    $searchModel = new \app\models\SkillsSearch();    
    return $searchModel->search(\Yii::$app->request->queryParams);
}
}