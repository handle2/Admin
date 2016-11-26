<?php
namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\AdminHelper as Admin;
use Modules\BusinessLogic\ContentSettings;

class AdminController extends ControllerBase
{
    public function initialize()
    {
       if(!$this->hasPermission()){
           $this->view->setMainView('login');
       }else{
           $this->view->setMainView('index');
       }
    }
    
    public function indexAction(){
    }
    
    public function registerProfileAction(){
        $form = $this->request->getJsonRawBody(true);
        ContentSettings\Profile::createProfile($form);
    }

    public function logoutAction(){
        $hash = $this->session->get("hash");
        $login = ContentSettings\Login::getLogin($hash);
        $login->delete();
        return $this->api(200,'success');
    }
    

    public function enterAction(){
        $form = $this->request->getJsonRawBody(true);

        /**@var $profile ContentSettings\Profile  */
        $profile = ContentSettings\Profile::login($form['username'],$form['password']);
        if($profile){
            $this->cookies->set('hash',md5($profile->username),time()+3600*24*7); //1 week
            $this->session->set("hash",md5($profile->username));
            if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                $ip = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } else {
                $ip = $_SERVER['REMOTE_ADDR'];
            }
            ContentSettings\Login::createLogin(array('hash' => md5($profile->username),'ip'=>$ip));
            return $this->api(200,'success');
        }

        return $this->api(404,'username_or_password_fail');
    }
}