<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.12.29.
 * Time: 13:01
 */

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings\Document;
use Modules\BusinessLogic\ContentSettings\Product;
use Modules\BusinessLogic\Search\DocumentSearch;
use Modules\BusinessLogic\Search\InputSearch;
use Modules\BusinessLogic\Search\ProdcategSearch;
use Modules\BusinessLogic\Search\ProductSearch;

class ProductController extends ControllerBase
{
    public function listAction(){
        $search = ProductSearch::createProductSearch();

        $search->lang = $this->lang;
        $products = $search->find();
        if($products){
            return $this->api(200,$products);
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = ProductSearch::createProductSearch();
        $search->lang = $this->lang;
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            /** @var Product $product */
            $product = $search->create($id);
            /** @var \ArrayObject|Document[] $pictures */
            $pictures = $product->getPictures();
            foreach ($pictures as &$picture){
                $picture->url = $picture->getUrl();
            }

            $product->pictures = $pictures;

        }else{
            $product = false;
        }

        if($product){
            return $this->api(200,$product);
        }
        return $this->api(200,false);
    }

    public function getProdcategsAction(){
        $search = ProdcategSearch::createProdcategSearch();
        $prodcategs = $search->find();
        if($prodcategs){
            return $this->api(200,$prodcategs);
        }else{
            return $this->api(200,false);
        }
    }

    public function getInputsAction(){
        $ids = $this->request->getJsonRawBody();
        $search = InputSearch::createInputSearch();
        $search->lang = $this->lang;
        $search->ids = $ids;
        $inputs = $search->find();
        if($inputs){
            return $this->api(200,$inputs);
        }else{
            return $this->api(200,false);
        }
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        $search = ProductSearch::createProductSearch();
        /** @var Product $product */
        $product = !empty($form->id)?$search->create($form->id):$search->create();
        foreach ($form as $key => $prop){
            if($key != 'id' && $key != 'pictureIds' && $key != 'pictures'){
                $product->{$key} = $prop;
            }
        }
        $pictureSearch = DocumentSearch::createDocumentSearch();
        if(!empty($form->pictures)){
            foreach ($form->pictures as $picture){
                $add = !empty($picture->id)?false:true;
                /**@var Document $p */
                /**@var Document $picture */
                $p = $pictureSearch->create($picture->id);
                $p->sourceImage = $picture->sourceImage;
                $p->croppedImage = $picture->croppedImage;
                $p->name = $picture->name;
                $p->type = $picture->type;
                $p->size = $picture->size;
                $p->bounds = $picture->bounds;
                $p->save();
                if($add){
                    $product->pictureIds[] = $p->id;
                }
            }
        }
        $product->save();
        return $this->api(200,$product->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = ProductSearch::createProductSearch();
        /** @var Product $product */
        $product = $search->create($id);
        $product->delete();

        return $this->api(200,"törölve");
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}