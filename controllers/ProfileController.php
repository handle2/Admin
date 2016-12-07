<?php

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings;
use Modules\BusinessLogic\Search\RoleSearch;

class ProfileController extends ControllerBase
{
    public function getUserAction($username){
        $profiles = ContentSettings\Profile::searchProfiles(["username"=>$username]);
        $roleSearch = RoleSearch::createRoleSearch();
        $roleSearch->code = $profiles[0]->role;
        $role = $roleSearch->findFirst();
        $profiles[0]->role = $role;
        return $this->api(200,json_encode($profiles[0]));
    }
}