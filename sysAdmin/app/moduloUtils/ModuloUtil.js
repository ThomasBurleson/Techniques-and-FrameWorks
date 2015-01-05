(function( define, angular ) {

    "use strict";

    define([
        'modUtil/controllers/AlertController'
    ],
    function( AlertController ) {

        var nomeModulo = 'sysadmin.Utils';

        angular.module( nomeModulo,[] )
            .controller( "AlertController", AlertController );

        return nomeModulo;
    })

}( define, angular ))