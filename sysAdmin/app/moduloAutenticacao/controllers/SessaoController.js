/**
 *
 *  This LoginController module uses RequireJS to `define` a AngularJS constructor function
 *  with its dependencies.
 *
 *  @author  Thomas Burleson
 *  @date    December, 2013
 *
 */
(function( define ) {
    "use strict";

    //Registra a class SessaoController com RequireJS

    define([
        'utils/supplant'
    ],
    function ( supplant ) {
        var VIEW_LOGIN      = "/login";
        var VIEW_REGISTER   = "/register";

        //SessaoController
        //@constructor

        var SessaoController = function( sessao, $rootScope, $log, $location ) {

                //AutoRouteToLogin()

                var validaSessao = function() {
                    
                    if ( sessao && !sessao.sessaoID ) {

                        if ( $location.path() != VIEW_LOGIN & $location.path() != VIEW_REGISTER ) {

                            $log.log("Sessão invalida : " + VIEW_LOGIN );

                            $location.path( VIEW_LOGIN );

                        }
                    }
                };

                $log.info( "SessaoController - constructor()" );

                // TODO - remember the bookmark url... and reroute to original bookmark AFTER login finishes
                // TODO - instead of reroute to Login... simply show the Login overlay WITHOUT changing $location

                // Make sure that we always have a valid session

                $rootScope.$on('$routeChangeSuccess', function() {
                    validaSessao();
                });

                // Olha a sessionID e auto route para o Login view
                // if logout() para chamada...

                $rootScope.$watch( function getSessao() {
                    return sessao.sessaoID;

                }, validaSessao );
        };

        // Registro da função construtor global

        return [ "sessao", "$rootScope", "$log", "$location", SessaoController ];

    });


}( define ));
