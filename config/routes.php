<?php
use Phalcon\Mvc\Router\Group;
 
$admin = new Group(array(
    'namespace' => 'Modules\Admin\Controllers',
    'module' => 'admin',
));

$admin->addGet('/admin', array(
        'controller' => 'admin',
        'action' => 'index'
    )
);

$admin->addPost('/admin/enter', array(
        'controller' => 'admin',
        'action' => 'enter'
    )
);

$admin->addPost('/admin/logout', array(
        'controller' => 'admin',
        'action' => 'logout'
    )
);

$admin->addPost('/admin/register/profile',array(
    'controller' => 'admin',
    'action'     => 'registerProfile'
));

$admin->addGet('/admin/profile/getUser/:params',array(
    'controller' => 'profile',
    'action'     => 'getUser',
    'params'     => 1
));

$admin->addPost('/admin/:controller/delete',array(
    'controller' => 1,
    'action'     => 'delete'
));

$admin->addPost('/admin/product/getInputs',array(
    'controller' => 'product',
    'action'     => 'getInputs'
));

$admin->addGet('/admin/language/getLangs',array(
    'controller' => 'language',
    'action'     => 'getLangs'
));

$admin->addPost('/admin/language/setLang',array(
    'controller' => 'language',
    'action'     => 'setLang'
));

$admin->addGet('/admin/:controller/get/:params',array(
    'controller' => 1,
    'action'     => 'get',
    'params'     => 2
));

$admin->addPost('/admin/:controller/save',array(
    'controller' => 1,
    'action'     => 'save'
));

$admin->addGet('/admin/:controller/list/:params',array(
    'controller' => 1,
    'action'     => 'list',
    'params'     => 2
));

$admin->addGet('/admin/right/getSub/:params',array(
    'controller' => "right",
    'action'     => 'getSub',
    'params'     => 1
));

$admin->addGet('/admin/:controller/:action/:params', array(
        'controller' => 1,
        'action' => 2,
        'params' => 3
    )
);

$admin->addGet('/admin/:controller', array(
        'controller' => 1,
        'action' => 'index'
    )
);

$router->mount($admin);