(function ($) {
    if (!$) {
        throw 'jQuery is not defined';
    }

    var $body = $('body');
    var $window = $(window);
    var events;
    events = {
        'click': 'click',
        'dblclick': 'double-click',
        'handle': 'handle',
        'move': 'move',
        'release': 'release',
        'dragstart': 'drag-start',
        'drag': 'drag',
        'dragenter': 'drag-enter',
        'dragover': 'drag-over',
        'dragleave': 'drag-leave',
        'drop': 'drop',
        'dragend': 'drag-end',
        'rotatestart': 'rotate-start',
        'rotate': 'rotate',
        'rotateend': 'rotate-end',
        'scroll': 'scroll',
        'zoom': 'zoom'
    };
    var setEventActive;
    setEventActive = function (eventName, event) {
        var $eventName, $eventDate, date, $clientX, $clientY, $alpha, $ratio;
        $eventName = $('#event-' + eventName + '-name');
        $eventDate = $('#event-' + eventName + '-date');
        $clientX = $('#event-' + eventName + '-clientX');
        $clientY = $('#event-' + eventName + '-clientY');
        $alpha = $('#event-' + eventName + '-alpha');
        $ratio = $('#event-' + eventName + '-ratio');
        if ($eventName) {
            $eventName.removeClass('fired');

            // Magic css3 animation restart
            $eventName.get(0).offsetWidth = $eventName.get(0).offsetWidth;

            $eventName.addClass('fired');
        }
        if ($eventDate) {
            date = moment();
            $eventDate.text(date.format('H[h] m[m] s[s] SSS[ms]'));
        }
        if ($clientX && event.clientX) {
            $clientX.text(event.clientX);
        }
        if ($clientY && event.clientY) {
            $clientY.text(event.clientY);
        }
        if ($alpha && event.alpha) {
            $clientY.text(event.alpha);
        }
    }
    var $dragElement;
    $dragElement = $('#drag-element', '#drag-and-drop-area');
    var $dropArea;
    $dropArea = $('#drop-area', '#drag-and-drop-area');

    _.each(events, function (eventName, eventType) {
        var $eventName;
        $eventName = $('#event-' + eventName + '-name');
        if ($eventName) {
            $eventName.on('animationEnd oAnimationEnd msAnimationEnd mozAnimationEnd webkitAnimationEnd', function (event) {
                $(this).removeClass('fired');
            });
            CCNBridge.on(eventType, function (event) {
                setEventActive(eventName, event);
            });
        }
    });

    $dragElement
        .on({
            'dragstart': function (event) {
                $(this).addClass('dragging');

                $dropArea.removeClass('active').addClass('pulse');
            },
            'dragend': function (event) {
                $(this).removeClass('dragging');
            }
        });

    $dropArea
        .on({
            'animationEnd oAnimationEnd msAnimationEnd mozAnimationEnd webkitAnimationEnd': function (event) {
                $(this).removeClass('pulse');
            },
            'dragover': function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                }

                return false;
            },
            'drop': function (event) {
                $(this).addClass('active').find('#drop-area-inside').addClass('icon icon-check');
            }
        });
})(window.jQuery);
