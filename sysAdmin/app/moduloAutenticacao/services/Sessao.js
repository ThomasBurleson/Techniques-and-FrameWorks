/**
 *
 *  This Session module uses RequireJS to `define` a AngularJS constructor function
 *  with its dependencies.
 *
 *  @author  Thomas Burleson
 *  @date    December, 2013
 *
 */

(function ( define ) {
    "use strict";

    //Registra a class Session

    define( [], function() {

        var validate = function ( target, defaultVal ) {
            return target || defaultVal;
        };

        var onClear  = function( all ) {
            _sessao.conta.userName   = validate( all, false ) ? '' : _sessao.conta.userName;
            _sessao.conta.password   = '';
            _sessao.conta.email      = '';
            _sessao.sessaoID         = null;

            return _sessao;
        };

        var _sessao = {

            conta : {
                userName : '',
                password : '',
                email    : ''
            },
            sessaoID  : null,
            clear     : onClear,
            logout    : onClear
        };

        // Publicação do construtor retornando a sessão - (singleton instances)
        // @returns Hashmap
        // @constructor

        return function() {
            return _sessao;
        };

    });

}( define ));
