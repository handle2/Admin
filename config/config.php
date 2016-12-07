<?php
function dd($data,$die = true){
    echo "<pre>";
        var_dump($data);
    echo "</pre>";
    if($die){
        die();
    }
}

return new \Phalcon\Config(array(
    'database' => array(
        'adapter'  => 'Mysql',
        'host'     => 'localhost',
        'username' => 'root',
        'password' => '',
        'name'     => 'test',
    ),
    'mongo' => array(
        'adapter'  => 'Mysql',
        'host'     => 'localhost',
        'username' => 'root',
        'password' => '',
        'name'     => 'test',
    ),
    'application' => array(
        'controllersDir' => __DIR__ . '/../controllers/',
        'modelsDir' => __DIR__ . '/../models/',
        'viewsDir' => __DIR__ . '/../views/',
        'phpExcel' =>   'plugins/PHPExcel-1.8/Classes/',
    )
));
