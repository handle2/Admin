<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.01.01.
 * Time: 19:06
 */

namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Discount;
use Modules\BusinessLogic\Search\DiscountSearch;

class DiscountController extends ControllerBase
{
    public function listAction(){
        $search = DiscountSearch::createDiscountSearch();
        $search->lang = $this->lang;
        $discounts = $search->find();
        if($discounts){
            return $this->api(200,($discounts));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = DiscountSearch::createDiscountSearch();
        $search->lang = $this->lang;
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $discount = $search->create($id);
        }else{
            $discount = false;
        }

        if($discount){
            return $this->api(200,($discount));
        }
        return $this->api(200,false);
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        $search = DiscountSearch::createDiscountSearch();
        /** @var Discount $discount */
        $discount = $form->id?$search->create($form->id):$search->create();
        $discount->name = $form->name;
        $discount->url = $this->urlMakeup($form->name);
        $discount->type = $form->type;
        $discount->value = $form->value;
        $discount->save();
        return $this->api(200,$discount->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = DiscountSearch::createDiscountSearch();
        /** @var Discount $discount */
        $discount = $search->create($id);
        $discount->delete();

        return $this->api(200,("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}