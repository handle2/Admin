<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2016.11.24.
 * Time: 15:33
 */

namespace Modules\Admin\Controllers;


class RightController extends ControllerBase
{
    public function getRightsAction(){

        return $this->api(200,json_encode('jogok'));
    }

    public function uploadAction(){}
    public function indexAction(){}
}