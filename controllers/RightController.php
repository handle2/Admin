<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.11.24.
 * Time: 15:33
 */

namespace Modules\Admin\Controllers;
use Modules\BusinessLogic\ContentSettings;

class RightController extends ControllerBase
{
    public function getAction($id = false){
        $rights = ContentSettings\Right::searchRights(["id" => (int)$id],["id"=>1,"name"=>1,"code"=>1,"type"=>1]);
        if($rights){
            return $this->api(200,json_encode($rights[0]));
        }
        return $this->api(200,false);
    }
    
    public function listAction($type){
        $rights = ContentSettings\Right::searchRights(["type"=>$type],["id"=>1,"name"=>1,"code"=>1,"type"=>1]);
        return $this->api(200,json_encode($rights));
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        if(empty($form->code)){
            $form->code = $form->name;
        }
        $right = ContentSettings\Right::createRight($form);
        return $this->api(200,json_encode($right));
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $res = ContentSettings\Right::deleteRight($id);
        if($res){
            return $this->api(200,json_encode("törölve"));
        }else{
            return $this->api(400,json_encode("törlés_hiba"));
        }

    }
    
    public function indexAction(){}

    public function editAction(){}
}