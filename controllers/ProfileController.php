<?php

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings;
use Modules\BusinessLogic\Search\ProfileSearch;
use Modules\BusinessLogic\Search\RoleSearch;

class ProfileController extends ControllerBase
{
    public function getUserAction(){

        $profile = $this->authUser;
        $roleSearch = RoleSearch::createRoleSearch();
        $roleSearch->code = $this->urlMakeup($profile->role);
        $role = $roleSearch->findFirst();
        $profile->role = $role;

        return $this->api(200,json_encode($profile));
    }
}