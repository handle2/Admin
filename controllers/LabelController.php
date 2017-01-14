<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.01.09.
 * Time: 10:57
 */

namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Label;
use Modules\BusinessLogic\Search\LabelSearch;

class LabelController extends ControllerBase
{
    public function listAction(){
        $search = LabelSearch::createLabelSearch();
        $search->lang = $this->lang;
        $found = $search->find();
        if($found){
            return $this->api(200,json_encode($found));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = LabelSearch::createLabelSearch();
        $search->lang = $this->lang;
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $found = $search->create($id);
        }else{
            $found = false;
        }

        if($found){
            return $this->api(200,json_encode($found));
        }
        return $this->api(200,false);
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        $search = LabelSearch::createLabelSearch();
        /** @var Label $label */
        $label = $form->id?$search->create($form->id):$search->create();
        $label->name = $form->name;
        $label->code = !empty($form->code)?$this->urlMakeup($form->code):$this->urlMakeup($form->name);
        $label->save();
        return $this->api(200,$label->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = LabelSearch::createLabelSearch();
        /** @var Label $label */
        $label = $search->create($id);
        $label->delete();

        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}