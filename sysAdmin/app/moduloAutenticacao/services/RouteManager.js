/**
 * ******************************************************************************************************
 *
 *   QuizModule
 *
 *   Defines controllers and services for the Online Quiz
 *
 *  @author     Thomas Burleson
 *  @date       December 2013
 *
 * ******************************************************************************************************
 */

(function ( define ) {
    "use strict";

    define([
            'modAute/controllers/LoginController'
        ],
        function ( LoginController ) {

            //Route management constructor ()
            //- to be used in angular.config()
            //@see bootstrap.js

            var RouteManager = function ( $routeProvider) {

                $routeProvider
                    .when( '/login', {
                        templateUrl : "app/moduloAutenticacao/viewmodel/login.html",
                        controller  : "LoginController"
                    })
                    .when( '/moduloDespesa', {
                        templateUrl : "app/moduloAutenticacao/viewmodel/register.html",
                        controller  : "LoginController"
                    })
                    .otherwise({
                        redirectTo  : '/login'
                    });

            };

            return ["$routeProvider", RouteManager ];
        });

}( define ));