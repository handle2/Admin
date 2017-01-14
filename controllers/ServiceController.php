<?php
/**
 * Created by PhpStorm.
 * User: Krisz
 * Date: 2017.01.14.
 * Time: 19:17
 */

namespace Modules\Admin\Controllers;


class ServiceController extends ControllerBase
{
    public function setLangAction(){
        $lang = $this->request->getJsonRawBody(true);
        $this->session->set('lang',$lang);
        return $this->api(200, $lang);
    }
}