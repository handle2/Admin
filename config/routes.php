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

$admin->addGet('/admin/role/getRoles',array(
    'controller' => 'role',
    'action'     => 'getRoles'
));

$admin->addGet('/admin/role/getRole/:params',array(
    'controller' => 'role',
    'action'     => 'getRole',
    'params'     => 1
));

$admin->addPost('/admin/role/save',array(
    'controller' => 'role',
    'action'     => 'save'
));

$admin->addGet('/admin/right/getRights',array(
    'controller' => 'right',
    'action'     => 'getRights'
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