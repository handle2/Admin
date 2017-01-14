<?php
namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Content;
use Modules\BusinessLogic\ContentSettings\Document;
use Modules\BusinessLogic\Search\ContentSearch;
use Modules\BusinessLogic\Search\DocumentSearch;

class ContentController extends ControllerBase{
    public function listAction(){
        $search = ContentSearch::createContentSearch();
        $search->lang = $this->lang;
        $contents = $search->find();
        if($contents){
            return $this->api(200,json_encode($contents));
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = ContentSearch::createContentSearch();
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $content = $search->create($id);
            if(!empty($content->pictureIds)){
                $picSearch = DocumentSearch::createDocumentSearch();
                $picSearch->ids = $content->pictureIds;
                $picSearch->disableCache();
                $pictures = $picSearch->find();
                $content->pictures = $pictures;
            }
        }else{
            $content = false;
        }

        if($content){
            return $this->api(200,json_encode($content));
        }
        return $this->api(200,false);
    }

    public function saveAction(){

        $form = $this->request->getJsonRawBody();
        $search = ContentSearch::createContentSearch();
        
        /** @var Content $content */
        $content = $form->id?$search->create($form->id):$search->create();
        $content->name = $form->name;
        $content->url = !empty($form->url)?$this->urlMakeup($form->url):$this->urlMakeup($form->name);
        $content->type = $form->type;
        $content->text = $form->text;
        $content->lead = $form->lead;

        $pictureSearch = DocumentSearch::createDocumentSearch();

        if(!empty($form->pictures)){
            foreach ($form->pictures as $picture){
                $add = !empty($picture->id)?false:true;
                /**@var Document $p */
                /**@var Document $picture */
                $p = $pictureSearch->create($picture->id);
                $p->sourceImage = $picture->sourceImage;
                $p->croppedImage = $picture->croppedImage;
                $p->bounds = $picture->bounds;
                $p->save();
                if($add){
                    $content->pictureIds[] = $p->id;
                }
            }
        }
        $content->labels = $form->labels;
        $content->save();
        return $this->api(200,$content->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = ContentSearch::createContentSearch();
        /** @var Content $content */
        $content = $search->create($id);
        $content->delete();

        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}