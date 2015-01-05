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

    //Registra a class LoginController com RequireJS

    define([
            'utils/supplant',
            'modUtil/controllers/AlertController'
        ],
        function ( supplant, AlertController ) {

            var SERVER_NOT_RESPONDING  = "O servidor sysAdmin não esta respondendo",
                UNABLE_TO_CONNECT      = 'Impossível conectar no Serviço de Dados do sysAdmin',
                TIMEOUT_RESPONSE       = 'Serviço de Dados não esta respondendo - (timed out)',
                PAGE_NOT_FOUND         = '404 Pagina não encontrada';

            //Função construtor usada pelo AngularJS para criar uma instancia do
            //service, factory, ou controller.
            //@constructor

            var LoginController = function( sessao, autenticacao, $scope, $q, $log, $location ) {

                    $log.info( "LoginController - constructor()" );

                    //registro
                    var onRegister = function() {
                        var message = "Esta funcionalidade ainda não esta disponível!";

                        $log.error( message );
                        //$window.alert( message );
                    };

                    //Delega o processo de login para $authenticator e aguarda por uam resposta
                    var onLogin = function () {

                        $log.log( "onLogin()" );

                        //$log.tryCatch( function() {

                            return autenticacao

                                //acessando o servico de login
                                .login( $scope.email, $scope.password )

                                //ocorrencia ok
                                .then( function onResult_login( response ) {

                                    $log.log( "onResult_login: " + response.sessao );

                                    sessao.sessaoID = response.sessao;
                                    sessao.conta = {
                                      userName :  $scope.email,
                                      password :  $scope.password,
                                      email    :  $scope.email
                                    };

                                    errorMessage( "" );

                                    // TODO - uses constants file for view navigations...

                                    $location.path( '/moduloMain' );

                                    return sessao;
                                },
                                //falha na ocorrencia
                                function onFault_login( fault ) {

                                    fault = fault || SERVER_NOT_RESPONDING;
                                    fault = supplant( String(fault), [ "onLogin()" ] );

                                    $log.error( fault.toString() );

                                    // force clear any previously valid session...
                                    sessao.sessaoID = null;
                                    errorMessage( fault.toString() );

                                    if ( fault == TIMEOUT_RESPONSE ) { errorMessage( SERVER_NOT_RESPONDING ); }
                                    if ( fault == PAGE_NOT_FOUND )   { errorMessage( PAGE_NOT_FOUND );        }

                                    return $q.reject( fault );
                                });
                        //});
                    };

                    //logout
                    var onLogout = function() {

                        $log.log("onLogout()");

                        //$log.tryCatch(function () {

                            return autenticacao

                                //acessando o servico de logout
                                .logout()

                                //ocorrencia ok
                                .then(function onResult_logout() {

                                    $log.log("onResult_logout()");

                                    $scope.sessaoID = null;
                                    sessao.sessaoID = null;

                                    errorMessage("");

                                    return sessao;
                                },
                                //falha na ocorrencia
                                function onFault_login(fault) {

                                    fault = fault || SERVER_NOT_RESPONDING;
                                    $log.error(fault.toString());

                                    // força a limpeza de qualquer sessão de login anterior...

                                    sessao.sessaoID = null;
                                    errorMessage(fault);

                                    if (fault == TIMEOUT_RESPONSE) {
                                        errorMessage(SERVER_NOT_RESPONDING);
                                    }
                                    if (fault == PAGE_NOT_FOUND) {
                                        errorMessage(PAGE_NOT_FOUND);
                                    }

                                    return $q.rejected(sessao);
                                });
                        //});
                    };

                    //forgot
                    var onForgot = function() {

                        $log.log("onForgot()");

                        //$log.tryCatch(function () {

                            return autenticacao

                                //acessando o servico forgot
                                .forgot($scope.email)

                                //ocorrencia ok
                                .then(function onResult_forgot( response ) {

                                    $log.log( "onResult_forgot()" );

                                    AlertController.showAlert('Atenção', 'Senha enviada para seu email.');

                                    onChangeDiv("L");

                                    errorMessage("");

                                    return true;
                                },

                                //falha na ocorrencia
                                function onFault_login(fault) {

                                    fault = fault || SERVER_NOT_RESPONDING;
                                    $log.error(fault.toString());

                                    // força a limpeza de qualquer sessão de login anterior...

                                    sessao.sessaoID = null;
                                    errorMessage(fault);

                                    if (fault == TIMEOUT_RESPONSE) {
                                        errorMessage(SERVER_NOT_RESPONDING);
                                    }
                                    if (fault == PAGE_NOT_FOUND) {
                                        errorMessage(PAGE_NOT_FOUND);
                                    }

                                    return $q.rejected(sessao);
                                });
                        //});
                    };

                    //Setar a errorMessage e title
                    var errorMessage = function( msg ) {
                        $scope.hasError = (msg !== "");
                        $scope.errorMessage = $scope.errorMessage || '';

                        // Allows errorMessage() to be accessor or mutator
                        if ( !angular.isUndefined( msg ) )  {
                            $scope.errorMessage = msg || '' ;
                            $scope.title        = UNABLE_TO_CONNECT;
                        }

                        return $scope.errorMessage;
                    };

                    //troca a div de Login, Esqueceu a senha e Registro
                    var onChangeDiv = function(cTp) {

                        $log.log( "TrocaDivLogin: " + cTp );

                        $scope.divLogin     = false;
                        $scope.divForgot    = false;
                        $scope.divRegistro  = false;

                        switch(cTp) {
                            case 'L' :
                                $scope.divLogin         = true;
                                $scope.mensagemAbertura = 'Seja bem-vindo.';
                                break;
                            case 'F':
                                $scope.divForgot        = true;
                                $scope.mensagemAbertura = 'Olá,';
                                break;
                            case 'R':
                                $scope.divRegistro      = true;
                                $scope.mensagemAbertura = 'Seja bem-vindo.';
                                break;
                        }
                        return true;
                    };

                    //Setar Div de Login
                    onChangeDiv('L');

                    //declaração
                    $scope.appNome      = 'SYS';
                    $scope.appDescricao = 'Controle de Despesas';
                    $scope.email        = "lecolecosa@gmail.com";
                    $scope.password     = "none";
                    $scope.sessaoID     = sessao.sessaoID;
                    $scope.errorMessage = "";

                    //publicacao de funcao, sendo usado na login.html
                    $scope.registerApp  = onRegister;
                    $scope.loginApp     = onLogin;
                    $scope.logoutApp    = onLogout;
                    $scope.forgotPas    = onForgot;
                    $scope.changeDivAut = onChangeDiv;

                };

            // Registro da função construtor global

            return [ "sessao", "autenticacao", "$scope", "$q", "$log", "$location", LoginController ];

        });


}( define ));
