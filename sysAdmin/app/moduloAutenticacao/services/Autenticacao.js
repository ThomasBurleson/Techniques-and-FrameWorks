/**
 * ******************************************************************************************************
 *
 *   Authenticator
 *
 *   Data service proxy to Authentication API that authorizes and authenticates the specified user.
 *
 *  @author     Thomas Burleson
 *  @date       December, 2013
 *
 *
 * ******************************************************************************************************
 */
(function ( define ) {
    "use strict";

    define([
            'utils/supplant',
            'utils/createGuid',
            'utils/crypto/md5'
        ],
        function ( supplant, createGuid, md5 ) {

            var Autenticacao = function ( $http, $q, $log ) {

                $log.log( "Autenticacao" );

                // Util - função para processar e resolver a promise (resolved)
                // @returns {promise|*|promise}

                var makeResolved = function( response ) {

                    var dfd = $q.defer();
                    dfd.resolve( response );

                    return dfd.promise;
                };

                // Util - função para processar e resolver a promise (rejected)
                // @returns {promise|*|promise}

                var makeRejected = function( fault ) {

                    var dfd = $q.defer();
                    dfd.reject( fault );

                    return dfd.promise;
                };

                // Requisição de usuario para autenticação
                // @return Promise

                var loginUser = function( email, password ) {

                     $log.log("loginUser()");

                     // Normally we have remote REST services...
                     // return $http.post( URL.LOGIN, { email : email, password : md5.encrypt(password) } );

                     return ( email === "" ) ?
                            makeRejected( "Um email valido e necessário!" ) :
                            makeResolved({ sessao : createGuid(), email : email });
                };

                // Logout do usuario
                // @return Promise

                var logoutUser = function() {
                     $log.log( "logoutUser()" );

                     // Normally we have remote REST services...
                     // return $http.get( URL.LOGOUT );

                     return makeResolved({
                         sessao : null
                     });
                };

                // Troca a senha do usuario
                //@return Promise

                var changePassword = function( email, newPassword, password ) {

                    $log.log( "changePassword()" );

                    //  return $http.post( URL.PASSWORD_CHANGE, {
                    //      userName    : email,
                    //      oldPassword : md5.encrypt(password ),
                    //      newPassword : md5.encrypt(newPassword)
                    //  });

                    return makeResolved({
                        email    : email,
                        password : newPassword
                    });
                };

                // Reset na senha do usuario
                // @return Promise

                var resetPassword = function( email, password, hint ) {

                     $log.log( "resetPassword()" );

                    // return $http.post( URL.PASSWORD_RESET, {
                    //     userName     : email,
                    //     newPassword  : md5.encrypt(password),
                    //     passwordHint : md5.encrypt(hint)
                    // });

                    return changePassword( email,  password );
                };

                // Procura pelo e-mail do usuario e envia a senha
                // @return Promise

                var forgotPassword = function( email ) {

                    $log.log( "forgotPassaword()" );

                    // return $http.post( URL.PASSWORD_RESET, {
                    //     userName     : email,
                    //     newPassword  : md5.encrypt(password),
                    //     passwordHint : md5.encrypt(hint)
                    // });
                    //var senha = md5.encrypt('none');
                    //md5.encrypt(senha)

                    return ( email === "" ) ?
                        makeRejected( "Informe o email do seu cadastro!" ) :
                        makeResolved( { password : '1234' } );
                };


               // Publica a autenticacao e delega a instance/object com a API

               return {

                   login           : loginUser,
                   logout          : logoutUser,
                   changePassword  : changePassword,
                   resetPassword   : resetPassword,
                   forgot          : forgotPassword

               };

            };

            return [ "$http", "$q", "$log", Autenticacao ];

        });

}( define ));
