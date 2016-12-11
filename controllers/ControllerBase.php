<?php
namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\Search\ProfileSearch;
use Modules\BusinessLogic\Search\RoleSearch;
use Phalcon\Mvc\Controller;

use Modules\BusinessLogic\Models as Models;

use Modules\BusinessLogic\ContentSettings;

use Modules\BusinessLogic\AdminHelper as Admin;

use Phalcon\Mvc\Dispatcher;

class ControllerBase extends Controller
{
    public $authUser;

    public function beforeExecuteRoute(Dispatcher $dispatcher){

        $result = $this->getPermission($this->router->getControllerName(),$this->router->getActionName());
        if(!$result){
            $this->view->setMainView('login');
        }else{
            $this->view->setMainView('index');
        }
    }

    public function getPermission($controller,$action){
       return $this->isLoggedIn();
    }
    /**
     * vizsgálja ,hogy be vagy-e lépve
     */
    public function isLoggedIn(){
        //adatbázisban létezik-e a cookie hash
       /* if(!$this->cookies->has("hash")){
            return false;
        }
        if(!$this->session->has("hash") && $this->cookies->has("hash")){
            $this->session->set("hash",$this->cookies->get("hash"));
        }*/

        $login = ContentSettings\Login::getLogin($this->session->get("hash"));
        if($login){
            $profileSearch = ProfileSearch::createProfileSearch();
            $profileSearch->id = $login->userId;
            $profile = $profileSearch->findFirst();
            $this->authUser = new \stdClass();
            $this->authUser->username = $profile->username;
            $this->authUser->email = $profile->email;
            $this->authUser->name = $profile->name;
            $this->authUser->role = $profile->role;

            $roleSearch = RoleSearch::createRoleSearch();
            $roleSearch->code = $this->authUser->role;
            $ownRole = $roleSearch->findFirst();
            $this->authUser->availableRoles = $ownRole->roles;

        }

        return $login;
    }

    /**
     * Megvizsgálja a jogosultságokat
     * @return bool
     */
    public function hasPermission(){
        return $this->isLoggedIn();
    }

    /**
     * @param $code
     * @param $data
     * @return \Phalcon\HTTP\ResponseInterface
     */
    protected function api($code, $data)
    {

        $this->response->setStatusCode($code);
        $this->response->setContentType("application/json; charset=UTF-8");
        $this->response->setContent(json_encode($data));

        return $this->response;

    }
    
}
