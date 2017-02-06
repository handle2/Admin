<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.02.02.
 * Time: 11:11
 */

namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Storage;
use Modules\BusinessLogic\Search\StorageSearch;

class StorageController extends ControllerBase
{
    public function listAction(){
        $search = StorageSearch::createStorageSearch();
        $search->lang = $this->lang;
        $found = $search->find();
        if($found){
            return $this->api(200,json_encode($found));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = StorageSearch::createStorageSearch();
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
        $search = StorageSearch::createStorageSearch();
        /** @var Storage $storage */
        $storage = $form->id?$search->create($form->id):$search->create();
        $storage->name = $form->name;
        $storage->code = !empty($form->code)?$this->urlMakeup($form->code):$this->urlMakeup($form->name);
        $storage->save();
        return $this->api(200,$storage->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = StorageSearch::createStorageSearch();
        /** @var Storage $storage */
        $storage = $search->create($id);
        $storage->delete();

        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}