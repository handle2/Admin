<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.12.29.
 * Time: 13:01
 */

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\Search\InputSearch;
use Modules\BusinessLogic\Search\ProdcategSearch;
use Modules\BusinessLogic\Search\ProductSearch;

class ProductController extends ControllerBase
{
    public function listAction(){
        $search = ProductSearch::createProductSearch();

        $products = $search->find();
        if($products){
            return $this->api(200,json_encode($products));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = ProductSearch::createProductSearch();
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $product = $search->create($id);
        }else{
            $product = false;
        }

        if($product){
            return $this->api(200,json_encode($product));
        }
        return $this->api(200,false);
    }

    public function getProdcategsAction(){
        $search = ProdcategSearch::createProdcategSearch();
        $prodcategs = $search->find();
        if($prodcategs){
            return $this->api(200,json_encode($prodcategs));
        }else{
            return $this->api(200,false);
        }
    }

    public function getInputsAction(){
        $ids = $this->request->getJsonRawBody();
        $search = InputSearch::createInputSearch();
        $search->ids = $ids;
        $inputs = $search->find();
        if($inputs){
            return $this->api(200,json_encode($inputs));
        }else{
            return $this->api(200,false);
        }
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}