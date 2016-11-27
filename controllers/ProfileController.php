<?php

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings;

class ProfileController extends ControllerBase
{
    public function getUserAction($username){
        $profiles = ContentSettings\Profile::searchProfiles(["username"=>$username]);
        return $this->api(200,json_encode($profiles[0]));
    }
}