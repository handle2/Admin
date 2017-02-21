<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.02.11.
 * Time: 16:49
 */

namespace Modules\Admin\Controllers;


use Modules\BusinessLogic\ContentSettings\Document;
use Modules\BusinessLogic\ContentSettings\Profile;
use Modules\BusinessLogic\Search\DocumentSearch;
use Modules\BusinessLogic\Search\ProfileSearch;

class PartnerController extends ControllerBase
{

    public function listAction(){
        $search = ProfileSearch::createProfileSearch();
        $search->lang = $this->lang;
        $search->availableRoles = $this->authUser->availableRoles;

        $search->cacheByLogin($this->urlMakeup($this->authUser->username));
        $found = $search->find();
        if($found){
            return $this->api(200,$found);
        }else{
            return $this->api(200,false);
        }
    }

    public function getAction($id = false){
        $search = ProfileSearch::createProfileSearch();
        $search->lang = $this->lang;
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            /** @var Profile $found */
            $found = $search->create($id);
            /** @var \ArrayObject|Document[] $pictures */
            $pictures = $found->getPictures();
            foreach ($pictures as &$picture){
                $picture->url = $picture->getUrl();
            }

            $found->pictures = $pictures;

        }else{
            $found = false;
        }

        if($found){
            return $this->api(200,$found);
        }
        return $this->api(200,false);
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        $search = ProfileSearch::createProfileSearch();
        /** @var Profile $profile */
        $profile = $form->id?$search->create($form->id):$search->create();
        $profile->username = $form->username;
        $profile->name = $form->name;
        $profile->email = $form->email;
        $profile->role = $form->role;
        $profile->group = $form->group;

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
                    $profile->pictureIds[] = $p->id;
                }
            }
        }

        $profile->save();
        return $this->api(200,$profile->id);
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = ProfileSearch::createProfileSearch();
        /** @var Profile $profile */
        $profile = $search->create($id);
        $profile->delete();

        return $this->api(200,"törölve");
    }

    public function sendPasswordAction($id){
        $search = ProfileSearch::createProfileSearch();
        /** @var Profile $profile */
        $profile = $search->create((int)$id);
        $profile->setPassword("asd123");
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}
}