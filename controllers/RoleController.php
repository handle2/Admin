<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.11.24.
 * Time: 15:33
 */

namespace Modules\Admin\Controllers;
use Modules\BusinessLogic\ContentSettings;

class RoleController extends ControllerBase
{

    public function getRolesAction(){
        $roles = ContentSettings\Role::searchRoles([]);
        if($roles){
            return $this->api(200,json_encode($roles));
        }else{
            return $this->api(404,"nincsenek elérhető szerepkörök");
        }
    }

    public function getRoleAction($id = false){
        $roles = ContentSettings\Role::searchRoles(["id" => (int)$id]);
        if($roles){
            return $this->api(200,json_encode($roles[0]));
        }
        return $this->api(200,false);
    }

    public function saveAction(){
        $form = $this->request->getJsonRawBody();
        $form->code = $form->name;
        $role = ContentSettings\Role::createRole($form);
        return $this->api(200,json_encode($role));
    }

    public function deleteAction(){
        $id = $this->request->getJsonRawBody();
        ContentSettings\Role::deleteRole($id);
        return $this->api(200,json_encode("törölve"));
    }

    public function uploadAction(){}
    public function editAction(){}
    public function indexAction(){}


}