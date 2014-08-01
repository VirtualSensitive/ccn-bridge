define(['jquery', 'underscore', 'd3', 'sigma', 'ccn-bridge', 'app/loader'], function ($, _, d3, sigma, CCNBridge, loader) {
    var initialize,
        _sigma,
        $loader;

    sigma = sigma || window.sigma;
    $loader = $('.loader-circular');

    initialize = function (dataFileName) {
        console.log('-- init --');
        if (!(dataFileName)) {
            throw 'No data file provided';
        }
        loader.load(dataFileName, function (data) {
            console.log('-- data loaded --');
            _sigma = new sigma('graph-container');

            _sigma.settings({
                // Scale
                scalingMode: 'inside',
                sideMargin: 20,
                minEdgeSize: 1,
                maxEdgeSize: 3,
                minNodeSize: 1,
                maxNodeSize: 30,
                // Zoom
                zoomMin: (1 / 128),
                zoomMax: 3,
                // Colors
                edgeColor: 'default',
                defaultEdgeColor: 'grey'
            });

            _.each(data.nodes, function (node) {
                _sigma.graph.addNode(node);
            });
            _.each(data.edges, function (edge) {
                _sigma.graph.addEdge(edge);
            });

            _sigma.refresh();

            $loader.on('transitionEnd oTransitionEnd msTransitionEnd mozTransitionEnd webkitTransitionEnd', function (event) {
                $(this).remove();
            }).addClass('dissapear');
        }, this);

    }

    return {
        'initialize': initialize
    }
});
