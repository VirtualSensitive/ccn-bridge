requirejs.config({
    baseUrl: 'assets/js/vendor',
    paths: {
        'jquery': 'jquery-2.1.1.min',
        'bootstrap': 'bootstrap-3.2.0.min',
        'moment': 'moment-2.7.0.min',
        'underscore': 'underscore-1.6.0.min',
        'd3': 'd3-3.4.11.min',
        'sigma': 'sigma-require-1.0.2',
        'ccn-bridge': 'ccn-bridge-triggerable-1.0.0.min',
        'app': '../modules'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    }
});

// App loading
requirejs([
    'jquery',
    'bootstrap',
    'app/graph'
], function ($, bootstrap, graph) {
    graph.initialize('assets/data/arctic.json');
});
