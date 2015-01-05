(function( head ) {
    "use strict";

    head
    .css (
        [
          "libs/bootstrap/dist/css/bootstrap.min.css",
          "libs/fontawesome/css/font-awesome.min.css",
          "libs/animate.css/animate.min.css",
          "libs/pace/themes/black/pace-theme-minimal.css",
          "resources/css/style.css"
        ]
    )
    .js(
        { pace       : "libs/pace/pace.min.js",                                  size: "83083"  },
        { require    : "libs/requirejs/require.js",                              size: "83083"  },
        { underscore : "libs/underscore/underscore.js",                          size: "14358"  },
        { angular    : "libs/angular/angular.js",                                size: "123465" },
        { ngRoute    : "libs/angular-route/angular-route.min.js",                size: "3886"   },
        { ngSanitize : "libs/angular-sanitize/angular-sanitize.js",              size: "4560"   },
        { ngBSTpls   : "libs/angular-bootstrap/ui-bootstrap-tpls.min.js",        size: "31819"  },
        { jquery     : "libs/jquery/dist/jquery.min.js",                         size: "84280"  },
        { jqueryUI   : "libs/jquery-ui/ui/minified/jquery-ui.min.js",            size: "228539" },
        { metisMenu  : "libs/metisMenu/dist/metisMenu.min.js",                   size: "1879"   },
        { slimscroll : "libs/slimscroll/jquery.slimscroll.min.js",               size: "4679"   }
    )
    //Para montagem da barra de progresso basta usar o striptSize que é igual a size definido no .js() e loaded que a soma do que ja foi carregado
    .notify( function (scriptName, scriptSize, loaded, total) {
        /*console.log(scriptName);
        console.log(scriptSize);
        console.log(loaded);
        console.log(total);*/
    })
    .ready("ALL", function() {

        //requireJS
        require.config ({
            appDir : '',
            baseUrl: 'app',
            paths : {

                "modAute"   : './moduloAutenticacao',
                "modUtil"   : './moduloUtils',
                "utils"     : './utils'

            },
            shim : {
                'underscore': { exports : '_' }
            }
        });
        require( [ "main" ], function( app ) {
            //Aplicação bootstrapped e inicialização
        });

    });

}( window.head ));
