(function( define ) {
    "use strict";

    define([],

        function() {

            var AlertController = function( $scope, $modal ) {

                //abre a modal
                var onShowAlert = function( alertTitle, alertMessage ) {

                    $scope.alertTitle   = alertTitle;
                    $scope.alertMessage = alertMessage;

                    var modalInstance = $modal.open({

                        templateUrl: 'app/utils/viewmodel/alert.html',
                        controller: 'onCloseAlert'

                    });
                    return true;
                };

                //fecha a modal
                var onCloseAlert = function($modalInstance) {

                    $modalInstance.close();

                    return true;
                };

                // Publica e delega a instance/object com a API
                return function() {

                    return {
                        showAlert  : onShowAlert
                        closeAlert : onCloseAlert
                    }
                };

            };

            //Publica global function
            //return [ "$scope", "$modal", AlertController ];

    });

}( define ));


