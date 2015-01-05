/**
 * ******************************************************************************************************
 *
 *   QuizModule
 *
 *   Defines controllers and services for the Authentication Module Quiz
 *
 *  @author     Thomas Burleson
 *  @date       December 2013
 *
 * ******************************************************************************************************
 */

(function ( define, angular ) {

    "use strict";

    define([
            'modAute/services/Sessao',
            'modAute/services/Autenticacao',
            'modAute/controllers/SessaoController',
            'modAute/controllers/LoginController'

        ],
        function ( Sessao, Autenticacao, SessaoController, LoginController ) {

            var nomeModulo = "sysAdmin.Autenticacao";

            angular
                .module( nomeModulo, [] )
                .service( "sessao", Sessao )
                .service( "autenticacao", Autenticacao )
                .controller( "SessaoController", SessaoController )
                .controller( "LoginController", LoginController );

            return nomeModulo;
        });

}( define, angular ));

