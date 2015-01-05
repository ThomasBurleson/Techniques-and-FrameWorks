/**
 * Now let's start our AngularJS app...
 * which uses RequireJS to load  packages and code
 *
 */
 (function ( define ) {
    "use strict";

     //RequireJS vai INJETAR o retorno de AuthenticateModule e RouteManager no MAIN em tempo de execução
    define([
            'modAute/services/RouteManager',
            'modAute/ModuloAutenticacao'
        ],
        function ( RouteManager, ModuloAutenticacao ) {

            //Especificar as dependencias da Aplicação MAIN...
            //Uma deleas é o modulo de Autenticação.
            //@type {Array}

            var app, appName = 'sysAdmin';

            console.log( "Iniciando: " + appName );

            //Inicio da aplicação MAIN
            //Inicio manual do processo do bootstrap; (ng:app esta escondida)
            //(Necessario para carregar a splash pre-AngularJS para terminar corretamente )

            app = angular
                    .module(
                        appName,
                        [ "ngRoute", "ngSanitize", ModuloAutenticacao ]
                    )
                    .config( RouteManager );

            angular.bootstrap( document.getElementsByTagName("body")[0], [ appName ]);

            return app;
        }
    );

}( define ));
