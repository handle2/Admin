<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.02.20.
 * Time: 15:42
 */

namespace Modules\Admin\Controllers;


class CartController extends ControllerBase
{
    public function listAction(){
            return $this->api(200,['cart','cart','cart']);
    }

    public function getAction($id = false){
        return $this->api(200,false);
    }

    public function saveAction(){

    }

    public function deleteAction(){

    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}