<?php

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings;
use Modules\BusinessLogic\Search\ProfileSearch;
use Modules\BusinessLogic\Search\RoleSearch;

class ProfileController extends ControllerBase
{
    public function getUserAction(){

        if($this->authUser){
            $profile = $this->authUser;
            $roleSearch = RoleSearch::createRoleSearch();
            $roleSearch->code = $this->urlMakeup($profile->role);
            $role = $roleSearch->findFirst();
            $profile->role = $role;

            return $this->api(200,($profile));
        }else{
            return $this->api(200,("not logged in"));
        }

    }
}