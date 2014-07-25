(function ($) {
    // Converts from degrees to radians.
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    Math.degrees = function(radians) {
        return radians * 180 / Math.PI;
    };

    if (!$) {
        throw 'jQuery is not defined';
    }

    var $body = $('body');
    var $window = $(window);
    var $document = $(document);
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
        if ($alpha && event.detail && event.detail.alpha) {
            $alpha.text(event.detail.alpha);
        }
        if ($ratio && event.detail && event.detail.ratio) {
            $ratio.text(event.detail.ratio);
        }
    }
    var $dragElement,
        $dropArea;
    $dragElement = $('#drag-element', '#drag-and-drop-area');
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

    var rotationArcSelector,
        rotationArc,
        rotationCircle,
        rotationArcCanRotate;
    rotationArcSelector = '#rotation-arc';
    rotationArc = d3.select(rotationArcSelector);
    rotationCircle = d3.select('#rotation-circle');
    rotationArcCanRotate = false;

    $document
        .on({
            mousedown: function (event) {
                rotationArcCanRotate = true;
                window.dispatchEvent(new CustomEvent('rotatestart', {
                    'detail': {
                        'time': new Date()
                    }
                }));
            }
        }, rotationArcSelector)
        .on({
            mouseup: function (event) {
                if (rotationArcCanRotate) {
                    rotationArcCanRotate = false;
                    window.dispatchEvent(new CustomEvent('rotateend', {
                        'detail': {
                            'time': new Date()
                        }
                    }));
                }
            },
            'wheel mousewheel': function (event, delta) {
                delta = delta || event.originalEvent.deltaY * -1 || event.originalEvent.wheelDelta;
                window.dispatchEvent(new CustomEvent('zoom', {
                    'detail': {
                        'time': new Date(),
                        'ratio': delta
                    }
                }));
            }
        });

    d3.select(document).on('mousemove', function (event) {
        var coords,
            alpha,
            arc;
        if (rotationArcCanRotate) {
            coords = d3.mouse(d3.select('#rotation-circle').node());
            alpha = -Math.atan2(50 - coords[0], 50 - coords[1]);
            arc = d3.svg.arc()
                .innerRadius(0)
                .outerRadius(50)
                .startAngle(alpha - Math.radians(15))
                .endAngle(alpha + Math.radians(15));

            rotationArc.attr('d', arc).attr('transform', 'translate(50, 50)');

            window.dispatchEvent(new CustomEvent('rotate', {
                'detail': {
                    'time': new Date(),
                    'alpha': Math.degrees(alpha)
                }
            }));
        }
    })
})(window.jQuery);
