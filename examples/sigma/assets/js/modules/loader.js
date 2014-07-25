define(['exports', 'jquery'], function (exports, $) {
    var load;

    load = function (filename, callback, scope) {
        callback = callback || function () {};
        scope = scope || this;
        $.get(filename)
            .done(function (data) {
                callback.apply(scope, [data]);
            }).fail(function (xhr, error, message) {
                console.error('unable to load : ' + filename, error, message);
            });
    }

    exports.loader = this;

    return {
        'name': 'loader',
        'load': load
    }
})
