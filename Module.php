<?php

namespace Modules\Admin;

use Phalcon\Loader;
use Phalcon\Mvc\View;
use Phalcon\DiInterface;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Db\Adapter\Pdo\Mysql as MySQLAdapter;
use Phalcon\Mvc\Collection\Manager;
use MongoClient;

class Module
{

    public function registerAutoloaders()
    {

        $loader = new Loader();

        $loader->registerNamespaces(array(
            'Modules\Admin\Controllers' => __DIR__ . '/controllers/',
            'Modules\BusinessLogic\Models' => 'modules/BusinessLogic/models/',
            'Modules\BusinessLogic\AdminHelper' => 'modules/BusinessLogic/AdminHelper/',
            'Modules\BusinessLogic\ContentSettings' => 'modules/BusinessLogic/ContentSettings/',
            'Modules\BusinessLogic\Search' => 'modules/BusinessLogic/Searches/',
        ));

        $loader->register();
    }

    public function registerServices(DiInterface $di)
    {

        /**
         * Read configuration
         */
        $config = include __DIR__ . "/config/config.php";

        $di['dispatcher'] = function () {
            $dispatcher = new Dispatcher();
            $dispatcher->setDefaultNamespace("Modules\Admin\Controllers");
            return $dispatcher;
        };

        /**
         * Setting up the view component
         */
        $di['view'] = function () {

            $view = new View();

            $view->setViewsDir('modules/admin/views/');
            $view->setLayoutsDir('modules/admin/views/');
            $view->setMainView('index');

            return $view;
        };

        $di->set('config', $config);
        /**
         * Database connection is created based in the parameters defined in the configuration file
         */
        $di['db'] = function () use ($config) {
            return new MySQLAdapter(array(
                "host" => $config->database->host,
                "username" => $config->database->username,
                "password" => $config->database->password,
                "dbname" => $config->database->name
            ));
        };
        /*require $config->application->phpExcel.'PHPExcel.php';
            $di->set('phpExcel',function ($config){
                return new PHPExcel();
            });*/
        /*
         * mongo adatbázis connection
         */
        $di->set('mongo', function () {
            $mongo = new MongoClient();
            return $mongo->selectDB("braincore2");
        }, true);

        //Register a collection manager
        $di->set('collectionManager', function() {
            return new Manager();

        });
    }
}
