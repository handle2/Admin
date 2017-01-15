<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.01.14.
 * Time: 19:17
 */

namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Language;
use Modules\BusinessLogic\Search\LanguageSearch;

class LanguageController extends ControllerBase
{
    public function setLangAction(){
        $lang = $this->request->getJsonRawBody(true);
        $this->session->set('lang',$lang);
        return $this->api(200, $lang);
    }

    public function getLangsAction(){
        $search = LanguageSearch::createLanguageSearch();
        $search->lang = $this->lang;
        $langs = $search->find();
        return $this->api(200, $langs);
    }

    public function listAction(){
        $search = LanguageSearch::createLanguageSearch();
        $search->lang = $this->lang;
        $found = $search->find();
        if($found){
            return $this->api(200,json_encode($found));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = LanguageSearch::createLanguageSearch();
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
        $search = LanguageSearch::createLanguageSearch();
        /** @var Language $language */
        $language = $form->id?$search->create($form->id):$search->create();
        $language->name = $form->name;
        $language->code = !empty($form->code)?$this->urlMakeup($form->code):$this->urlMakeup($form->name);
        $language->save();
        return $this->api(200,$language->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = LanguageSearch::createLanguageSearch();
        /** @var Language $language */
        $language = $search->create($id);
        $language->delete();

        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}