<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.11.24.
 * Time: 15:33
 */

namespace Modules\Admin\Controllers;
use Modules\BusinessLogic\ContentSettings;
use Modules\BusinessLogic\Search\RightSearch;

class RightController extends ControllerBase
{

    public function getAction($id = false){
        $search = RightSearch::createRightSearch();
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $right = $search->create($id);
        }else{
            $right = false;
        }

        if($right){
            return $this->api(200,json_encode($right));
        }
        return $this->api(200,false);
    }

    
    public function listAction($type = false){
        $search = RightSearch::createRightSearch();
        if($type){
            $search->type = $type;
        }
        $rights = $search->find();
        return $this->api(200,json_encode($rights));
    }

    public function saveAction(){

        $search = RightSearch::createRightSearch();
        $form = $this->request->getJsonRawBody();
        /**@var \Modules\BusinessLogic\ContentSettings\Right $right*/
        $right = $form->id?$search->create($form->id):$search->create();
        $right->name = $form->name;
        $right->parent = $form->parent;
        $right->code = $form->code?$form->code:mb_strtolower($form->name);
        $right->type = $form->type;

        $right->save();
        return $this->api(200,json_encode($right));

    }

    public function getSubAction($parent){
        $search = RightSearch::createRightSearch();
        $search->type = "subRight";
        $search->parent = $parent;
        $rights = $search->find();

        return $this->api(200,json_encode($rights));
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = RightSearch::createRightSearch();
        /**@var \Modules\BusinessLogic\ContentSettings\Right $right*/
        $right = $search->create($id);
        $right->delete();

        return $this->api(200,json_encode("törölve"));

    }
    
    public function indexAction(){}

    public function editAction(){}
}