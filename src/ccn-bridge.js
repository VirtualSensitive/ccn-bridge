/**
 * CoCoNote Bridge
 * Listen for tactile events in JavaScript
 *
 * Version 0.0.1
 *
 * 15/07/2014
 *
 * @preserve Copyright @ VirtualSensitive 2014 <florent.schildknecht@gmail.com>
 */

;(function (root) {
  'use strict';
  // CCNBridge Revealing Module
  var CCNBridge = (function () {
    // Variables
    var events,
        getEvents,
        listeners,
        getListeners,
        on,
        onClick,
        onDoubleClick,
        onHandle,
        onMove,
        onRelease,
        onDragStart,
        onDrag,
        onDragEnd,
        onDragEnter,
        onDragOver,
        onDragLeave,
        onDrop,
        onScroll,
        onRotateStart,
        onRotate,
        onRotateEnd,
        onZoom,
        off,
        offClick,
        offDoubleClick,
        offHandle,
        offMove,
        offRelease,
        offDragStart,
        offDrag,
        offDragEnd,
        offDragEnter,
        offDragOver,
        offDragLeave,
        offDrop,
        offScroll,
        offRotateStart,
        offRotate,
        offRotateEnd,
        offZoom,
        removeAllListeners,
        windowListener,
        trigger,
        messages;

    /**
     * List of events
     * [Item] --> Event name : listener-list name
     */
    events ={
      'click': 'click',
      'dblclick': 'double-click',
      'handle': 'handle',
      'move': 'move',
      'release': 'release',
      'dragstart': 'drag-start',
      'drag': 'drag',
      'dragend': 'drag-end',
      'dragenter': 'drag-enter',
      'dragover': 'drag-over',
      'dragleave': 'drag-leave',
      'drop': 'drop',
      'scroll': 'scroll',
      'rotatestart': 'rotate-start',
      'rotate': 'rotate',
      'rotateend': 'rotate-end',
      'zoom': 'zoom'
    };

    /**
     * List of callbacks / listeners to execute each time an event occur
     */
    listeners = {
      'click': [],
      'double-click': [],
      'handle': [],
      'move': [],
      'release': [],
      'drag-start': [],
      'drag': [],
      'drag-end': [],
      'drag-enter': [],
      'drag-over': [],
      'drag-leave': [],
      'drop': [],
      'scroll': [],
      'rotate-start': [],
      'rotate': [],
      'rotate-end': [],
      'zoom': []
    };

    /**
     * Trigger method for JavaScript and C++ events
     *
     * Execute every callbacks registred for the given event
     */
    trigger = function (eventType, event) {
      var listenerType, listenersList, l;

      // Check if the event-type is defined by this API
      if (!(eventType in events)) {
        throw 'Impossible to trigger event : ' + eventType;
      }

      listenerType = events[eventType];
      // Get the callbacks list
      listenersList = listeners[listenerType];
      l = listenersList.length - 1;

      while (l >= 0) {
        // For each callback, execute it with the given scope
        listenersList[l].callback.apply(listenersList[l].scope, [event]);
        l = l-1;
      }
    };

    /**
     * windowListener private reference :
     *
     * bind or unbind events on JavaScript window object
     */
    windowListener = (function (CCNBridge) {
      var on,
        clickHandler,
        doubleClickHandler,
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler,
        touchStartHandler,
        touchMoveHandler,
        touchEndHandler,
        dragStartHandler,
        dragHandler,
        dragEndHandler,
        dragEnterHandler,
        dragOverHandler,
        dragLeaveHandler,
        dropHandler,
        scrollHandler,
        rotateStartHandler,
        rotateHandler,
        rotateEndHandler,
        zoomHandler,
        off;
      clickHandler = function (event) {
        trigger.apply(CCNBridge, ['click', event]);
      };
      doubleClickHandler = function (event) {
        trigger.apply(CCNBridge, ['dblclick', event]);
      };
      mouseDownHandler = function (event) {
        trigger.apply(CCNBridge, ['handle', event]);
      };
      mouseMoveHandler = function (event) {
        trigger.apply(CCNBridge, ['move', event]);
      };
      mouseUpHandler = function (event) {
        trigger.apply(CCNBridge, ['release', event]);
      };
      touchStartHandler = function (event) {
        trigger.apply(CCNBridge, ['handle', event]);
      };
      touchMoveHandler = function (event) {
        trigger.apply(CCNBridge, ['move', event]);
      };
      touchEndHandler = function (event) {
        trigger.apply(CCNBridge, ['release', event]);
      };
      dragStartHandler = function (event) {
        trigger.apply(CCNBridge, ['dragstart', event]);
      };
      dragHandler = function (event) {
        trigger.apply(CCNBridge, ['drag', event]);
      };
      dragEndHandler = function (event) {
        trigger.apply(CCNBridge, ['dragend', event]);
      };
      dragEnterHandler = function (event) {
        trigger.apply(CCNBridge, ['dragenter', event]);
      };
      dragOverHandler = function (event) {
        trigger.apply(CCNBridge, ['dragover', event]);
      };
      dragLeaveHandler = function (event) {
        trigger.apply(CCNBridge, ['dragleave', event]);
      };
      dropHandler = function (event) {
        trigger.apply(CCNBridge, ['drop', event]);
      };
      scrollHandler = function (event) {
        trigger.apply(CCNBridge, ['scroll', event]);
      };
      rotateStartHandler = function (event) {
        trigger.apply(CCNBridge, ['rotatestart', event]);
      };
      rotateHandler = function (event) {
        trigger.apply(CCNBridge, ['rotate', event]);
      };
      rotateEndHandler = function (event) {
        trigger.apply(CCNBridge, ['rotateend', event]);
      };
      zoomHandler = function (event) {
        trigger.apply(CCNBridge, ['zoom', event]);
      };
      on = function () {
        window.addEventListener('click', clickHandler, false);
        window.addEventListener('dblclick', doubleClickHandler, false);
        window.addEventListener('mousedown', mouseDownHandler, false);
        window.addEventListener('mousemove', mouseMoveHandler, false);
        window.addEventListener('mouseup', mouseUpHandler, false);
        window.addEventListener('touchstart', touchStartHandler, false);
        window.addEventListener('touchmove', touchMoveHandler, false);
        window.addEventListener('touchend', touchEndHandler, false);
        window.addEventListener('dragstart', dragStartHandler, false);
        window.addEventListener('drag', dragHandler, false);
        window.addEventListener('dragend', dragEndHandler, false);
        window.addEventListener('dragenter', dragEnterHandler, false);
        window.addEventListener('dragover', dragOverHandler, false);
        window.addEventListener('dragleave', dragLeaveHandler, false);
        window.addEventListener('drop', dropHandler, false);
        window.addEventListener('scroll', scrollHandler, false);
        window.addEventListener('rotatestart', rotateStartHandler, false);
        window.addEventListener('rotate', rotateHandler, false);
        window.addEventListener('rotateend', rotateEndHandler, false);
        window.addEventListener('zoom', zoomHandler, false);
      };
      off = function () {
        window.removeEventListener('click', clickHandler, false);
        window.removeEventListener('dblclick', doubleClickHandler, false);
        window.removeEventListener('mousedown', mouseDownHandler, false);
        window.removeEventListener('mousemove', mouseMoveHandler, false);
        window.removeEventListener('mouseup', mouseUpHandler, false);
        window.removeEventListener('touchstart', touchStartHandler, false);
        window.removeEventListener('touchmove', touchMoveHandler, false);
        window.removeEventListener('touchend', touchEndHandler, false);
        window.removeEventListener('dragstart', dragStartHandler, false);
        window.removeEventListener('drag', dragHandler, false);
        window.removeEventListener('dragend', dragEndHandler, false);
        window.removeEventListener('dragenter', dragEnterHandler, false);
        window.removeEventListener('dragover', dragOverHandler, false);
        window.removeEventListener('dragleave', dragLeaveHandler, false);
        window.removeEventListener('drop', dropHandler, false);
        window.removeEventListener('scroll', scrollHandler, false);
        window.removeEventListener('rotatestart', rotateStartHandler, false);
        window.removeEventListener('rotate', rotateHandler, false);
        window.removeEventListener('rotateend', rotateEndHandler, false);
        window.removeEventListener('zoom', zoomHandler, false);
      };
      return {
        'on': on,
        'off': off
      };
    })(this);

    window.addEventListener('load', function (event) {
      // On page load : bind events on window object by default
      windowListener.on();
    });

    /**
     * Get listeners
     *
     * @return array
     */
    getListeners = function () {
      return listeners;
    };

    /**
     * Get events
     *
     * @return array
     */
    getEvents = function () {
      return events;
    };

    // Methods
    /**
     * Register a callback for an event
     */
    on = function (eventType, callback, scope) {
      var listenerType;
      scope = scope || window;

      // Check if the event-type is defined by this API
      if (!(eventType in events)) {
        throw 'Impossible to bind event : ' + eventType;
      }

      listenerType = events[eventType];

      // Push a new listener that will be executed when this event will occur
      listeners[listenerType].push({
        'scope': scope,
        'callback': callback
      });
    };

    /**
     * Alias for "on" method with click event-type
     */
    onClick = function (callback, scope) {
      this.on('click', callback, scope);
    };

    /**
     * Alias for "on" method with double-click event-type
     */
    onDoubleClick = function (callback, scope) {
      this.on('dblclick', callback, scope);
    };

    /**
     * Alias for "on" method with handle event-type
     */
    onHandle = function (callback, scope) {
      this.on('handle', callback, scope);
    };

    /**
     * Alias for "on" method with move event-type
     */
    onMove = function (callback, scope) {
      this.on('move', callback, scope);
    };

    /**
     * Alias for "on" method with release event-type
     */
    onRelease = function (callback, scope) {
      this.on('release', callback, scope);
    };

    /**
     * Alias for "on" method with dragstart event-type
     */
    onDragStart = function (callback, scope) {
      this.on('dragstart', callback, scope);
    };

    /**
     * Alias for "on" method with drag event-type
     */
    onDrag = function (callback, scope) {
      this.on('drag', callback, scope);
    };

    /**
     * Alias for "on" method with dragend event-type
     */
    onDragEnd = function (callback, scope) {
      this.on('dragend', callback, scope);
    };

    /**
     * Alias for "on" method with dragenter event-type
     */
    onDragEnter = function (callback, scope) {
      this.on('dragenter', callback, scope);
    };

    /**
     * Alias for "on" method with dragover event-type
     */
    onDragOver = function (callback, scope) {
      this.on('dragover', callback, scope);
    };

    /**
     * Alias for "on" method with dragleave event-type
     */
    onDragLeave = function (callback, scope) {
      this.on('dragleave', callback, scope);
    };

    /**
     * Alias for "on" method with drop event-type
     */
    onDrop = function (callback, scope) {
      this.on('drop', callback, scope);
    };

    /**
     * Alias for "on" method with scroll event-type
     */
    onScroll = function (callback, scope) {
      this.on('scroll', callback, scope);
    };

    /**
     * Alias for "on" method with rotatestart event-type
     */
    onRotateStart = function (callback, scope) {
      this.on('rotatestart', callback, scope);
    };

    /**
     * Alias for "on" method with rotate event-type
     */
    onRotate = function (callback, scope) {
      this.on('rotate', callback, scope);
    };

    /**
     * Alias for "on" method with rotateend event-type
     */
    onRotateEnd = function (callback, scope) {
      this.on('rotateend', callback, scope);
    };

    /**
     * Alias for "on" method with zoom event-type
     */
    onZoom = function (callback, scope) {
      this.on('zoom', callback, scope);
    };

    /**
     * Unregister one or several previously registred callbacks
     *
     * warning: This should not work for anonymous callbacks
     *
     * @param [optionnal] eventType : the event type to unregister
     * @param [optionnal] callback : the callback to unregister
     * @param [optionnal] scope : the callback's scope (default: window)
     *
     * Note : if no callback is provided, this method will unregister every callbacks for the given eventType
     * Note : if no eventType is provided, this method will unregister every callbacks for every events
     */
    off = function (eventType, callback, scope) {
      var listenerType, listenersList, indexOfCallbackInList, index;
      scope = scope || window;

      // Check if the event-type is defined by this API
      if (eventType && eventType in events) {
        listenerType = events[eventType];

        if (callback) {
          // Get the current listeners list for the given event
          listenersList = listeners[listenerType];
          // Get the callback index in the list
          indexOfCallbackInList = function (list, callback, scope) {
            var l = list.length - 1;
            while (l >= 0) {
              var item = list[l];
              // Compare both callback and scope
              if (item.scope === scope && item.callback === callback) {
                return l;
              }
              l = l-1;
            }

            return -1;
          };
          index = indexOfCallbackInList(listenersList, callback, scope);

          // If the callback is found, remove it from the list
          if (index > (-1)) {
            listenersList.splice(index, 1);
          }
        } else {
          // If the callback is not given, remove all callbacks of the event
          listeners[listenerType] = [];
        }
      } else {
        // If the event is not given, remove all callbacks of all events
        listeners = {
          'translation': [],
          'rotation': [],
          'zoom': []
        };
      }
    };

    /**
     * Alias for "off" method with click event-type
     */
    offClick = function (callback, scope) {
      this.off('click', callback, scope);
    };

    /**
     * Alias for "off" method with double-click event-type
     */
    offDoubleClick = function (callback, scope) {
      this.off('double-click', callback, scope);
    };

    /**
     * Alias for "off" method with handle event-type
     */
    offHandle = function (callback, scope) {
      this.off('handle', callback, scope);
    };

    /**
     * Alias for "off" method with move event-type
     */
    offMove = function (callback, scope) {
      this.off('move', callback, scope);
    };

    /**
     * Alias for "off" method with release event-type
     */
    offRelease = function (callback, scope) {
      this.off('release', callback, scope);
    };

    /**
     * Alias for "off" method with drag event-type
     */
    offDrag = function (callback, scope) {
      this.off('drag', callback, scope);
    };

    /**
     * Alias for "off" method with drop event-type
     */
    offDrop = function (callback, scope) {
      this.off('drop', callback, scope);
    };

    /**
     * Alias for "off" method with scroll event-type
     */
    offScroll = function (callback, scope) {
      this.off('scroll', callback, scope);
    };

    /**
     * Alias for "off" method with rotatestart event-type
     */
    offRotateStart = function (callback, scope) {
      this.off('rotatestart', callback, scope);
    };

    /**
     * Alias for "off" method with rotate event-type
     */
    offRotate = function (callback, scope) {
      this.off('rotate', callback, scope);
    };

    /**
     * Alias for "off" method with rotateend event-type
     */
    offRotateEnd = function (callback, scope) {
      this.off('rotateend', callback, scope);
    };

    /**
     * Alias for "off" method with zoom event-type
     */
    offZoom = function (callback, scope) {
      this.off('zoom', callback, scope);
    };

    /**
     * Alias for "off" method with optionnal eventType
     */
    removeAllListeners = function (eventType) {
      this.off(eventType);
    };

    messages = (function (scope, qtframework) {
      var send;
      send = function (content) {
        if ((!(qtframework)) || (typeof qtframework.send === 'undefined')) {
          window.console.warn('QtFramework System class is not provided for messages sending and receiving');
        } else {
          qtframework.send.apply(qtframework, content);
        }
      };
      // TODO: Receive method
      return {
        'send': send,
        'receive': null
      };
    })(this, null);

    // Public scope : return all accessible methods
    return {
      'getEvents': getEvents,
      'getListeners': getListeners,
      'on': on,
      'onClick': onClick,
      'onHandle': onHandle,
      'onMove': onMove,
      'onRelease': onRelease,
      'onDragStart': onDragStart,
      'onDrag': onDrag,
      'onDragEnd': onDragEnd,
      'onDragEnter': onDragEnter,
      'onDragOver': onDragOver,
      'onDragLeave': onDragLeave,
      'onDrop': onDrop,
      'onScroll': onScroll,
      'onRotateStart': onRotateStart,
      'onRotate': onRotate,
      'onRotateEnd': onRotateEnd,
      'onZoom': onZoom,
      'off': off,
      'offClick': offClick,
      'offHandle': offHandle,
      'offMove': offMove,
      'offRelease': offRelease,
      'offDragStart': offDragStart,
      'offDrag': offDrag,
      'offDragEnd': offDragEnd,
      'offDragEnter': offDragEnter,
      'offDragOver': offDragOver,
      'offDragLeave': offDragLeave,
      'offDrop': offDrop,
      'offScroll': offScroll,
      'offRotateStart': offRotateStart,
      'offRotate': offRotate,
      'offRotateEnd': offRotateEnd,
      'offZoom': offZoom,
      'removeAllListeners': removeAllListeners,
      'messages': messages
    };
  })();

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = CCNBridge;
    }
    exports.CCNBridge = CCNBridge;
  }
})(this);
