<?php
namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\Search\ProfileSearch;
use Modules\BusinessLogic\Search\RightSearch;
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
        //todo login és missing_right error legyen külön

        $result = $this->getPermission($this->router->getControllerName(),$this->router->getActionName());

        if(!$result){
            $this->view->setMainView('login');
            return false;
        }else{
            $this->view->setMainView('index');
        }
    }

    /**
     * @param $controller
     * @param $action
     * @return bool
     */
    public function getPermission($controller,$action){

        $logged = $this->isLoggedIn();

        $rightSearch = RightSearch::createRightSearch();
        $rightSearch->action = $action;
        $rightSearch->controller = $controller;
        $rootedRight = $rightSearch->findFirst();

        $roleSearch = RoleSearch::createRoleSearch();
        $roleSearch->code = $this->authUser->role;
        $selfRole = $roleSearch->findFirst();

        $enabledAction = true;
        if($rootedRight){
            $enabledAction = in_array($rootedRight->code,$selfRole->rights)?true:false;
        }

        if($logged && $enabledAction){
            return true;
        }else{
            return false;
        }
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
            $this->authUser->availableRoles = count($ownRole->roles)>0?$ownRole->roles:[false];

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
