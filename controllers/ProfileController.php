<?php

namespace Modules\Admin\Controllers;

use Modules\BusinessLogic\ContentSettings;

class ProfileController extends ControllerBase
{
    public function getUserAction(){
        $form = $this->request->getJsonRawBody();
        $profiles = ContentSettings\Profile::searchProfiles(["username"=>$form]);
        return $this->api(200,json_encode($profiles[0]));
    }
}