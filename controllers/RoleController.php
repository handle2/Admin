<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.11.24.
 * Time: 15:33
 */

namespace Modules\Admin\Controllers;
use Modules\BusinessLogic\ContentSettings;
use Modules\BusinessLogic\Search\RoleSearch;

class RoleController extends ControllerBase
{

    public function listAction(){
        $search = RoleSearch::createRoleSearch();

        if($this->authUser->role != 'admin'){
            $search->roles = $this->authUser->availableRoles;
        }

        $roles = $search->find();
        if($roles){
            return $this->api(200,json_encode($roles));
        }else{
            return $this->api(404,false);
        }
    }

    public function getAction($id = false){
        $roleSearch = RoleSearch::createRoleSearch();
        $id = (int)$id!=0?(int)$id:false;
        if($id){
            $role = $roleSearch->create($id);
        }else{
            $role = false;
        }

        if($role){
            return $this->api(200,json_encode($role));
        }
        return $this->api(200,false);
    }

    public function saveAction(){
        $search = RoleSearch::createRoleSearch();
        $form = $this->request->getJsonRawBody();
        /**@var \Modules\BusinessLogic\ContentSettings\Role $role*/
        $role = $form->id?$search->create($form->id):$search->create();
        $role->code = $form->code?$form->code:$this->urlMakeup($form->name);
        $role->name = $form->name;
        $role->rights = $form->rights;
        $role->roles = $form->roles;
        $role->save();
        return $this->api(200,json_encode($role));
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        $search = RoleSearch::createRoleSearch();
        /** @var ContentSettings\Role $role */
        $role = $search->create($id);
        $role->delete();

        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}


}