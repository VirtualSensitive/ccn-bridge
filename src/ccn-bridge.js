/**
 * CoCoNote Bridge
 * Listen for tactile events in JavaScript
 *
 * @version 0.0.2
 *
 * @since 15/07/2014
 *
 * @author <florent.schildknecht@gmail.com>
 * @copyright Virtual Sensitive 2014 - contact@virtualsensitive.com
 */


;(function (root) {
  'use strict';
  // CCNBridge Revealing Module
  /**
   * CCNBridge :
   *
   * @module CCNBridge
   */
  var CCNBridge = (function () {
    // Variables
    var _events,
        _getEvents,
        _listeners,
        _getListeners,
        _on,
        _onClick,
        _onDoubleClick,
        _onHandle,
        _onMove,
        _onRelease,
        _onDragStart,
        _onDrag,
        _onDragEnd,
        _onDragEnter,
        _onDragOver,
        _onDragLeave,
        _onDrop,
        _onScroll,
        _onRotateStart,
        _onRotate,
        _onRotateEnd,
        _onZoom,
        _off,
        _offClick,
        _offDoubleClick,
        _offHandle,
        _offMove,
        _offRelease,
        _offDragStart,
        _offDrag,
        _offDragEnd,
        _offDragEnter,
        _offDragOver,
        _offDragLeave,
        _offDrop,
        _offScroll,
        _offRotateStart,
        _offRotate,
        _offRotateEnd,
        _offZoom,
        _removeAllListeners,
        _windowListener,
        _trigger,
        _messages;

    /**
     * List of _events
     * [Item] --> Event name : _listener-list name
     * @public
     */
    _events = {
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
     * List of callbacks / _listeners to execute each time an event occur
     */
    _listeners = {
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
     * Trigger method for JavaScript and C++ _events
     * Execute every callbacks registred for the given event
     *
     * @param {string} eventType - The event type to listen for
     * @param {string} event - The event object itself
     * @throws Will throw an error if the eventType is unknown
     * @private
     */
    _trigger = function (eventType, event) {
      var _listenerType, _listenersList, l;

      // Check if the event-type is defined by this API
      if (!(eventType in _events)) {
        throw 'Impossible to _trigger event : ' + eventType;
      }

      _listenerType = _events[eventType];
      // Get the callbacks list
      _listenersList = _listeners[_listenerType];
      l = _listenersList.length - 1;

      while (l >= 0) {
        // For each callback, execute it with the given scope
        var listener;
        listener = _listenersList[l];
        listener.callback.apply(listener.scope, [event]);
        l = l - 1;
      }
    };

    /**
     * windowListener reference
     * bind or unbind _events _on JavaScript window object
     *
     * @param {object} CCNBridge - The CCNBridge scope
     * @private
     */
    _windowListener = (function (CCNBridge) {
      var _on,
        _clickHandler,
        _doubleClickHandler,
        _mouseDownHandler,
        _mouseMoveHandler,
        _mouseUpHandler,
        _touchStartHandler,
        _touchMoveHandler,
        _touchEndHandler,
        _dragStartHandler,
        _dragHandler,
        _dragEndHandler,
        _dragEnterHandler,
        _dragOverHandler,
        _dragLeaveHandler,
        _dropHandler,
        _scrollHandler,
        _rotateStartHandler,
        _rotateHandler,
        _rotateEndHandler,
        _zoomHandler,
        _off;

      _clickHandler = function (event) {
        _trigger.apply(CCNBridge, ['click', event]);
      };
      _doubleClickHandler = function (event) {
        _trigger.apply(CCNBridge, ['dblclick', event]);
      };
      _mouseDownHandler = function (event) {
        _trigger.apply(CCNBridge, ['handle', event]);
      };
      _mouseMoveHandler = function (event) {
        _trigger.apply(CCNBridge, ['move', event]);
      };
      _mouseUpHandler = function (event) {
        _trigger.apply(CCNBridge, ['release', event]);
      };
      _touchStartHandler = function (event) {
        _trigger.apply(CCNBridge, ['handle', event]);
      };
      _touchMoveHandler = function (event) {
        _trigger.apply(CCNBridge, ['move', event]);
      };
      _touchEndHandler = function (event) {
        _trigger.apply(CCNBridge, ['release', event]);
      };
      _dragStartHandler = function (event) {
        _trigger.apply(CCNBridge, ['dragstart', event]);
      };
      _dragHandler = function (event) {
        _trigger.apply(CCNBridge, ['drag', event]);
      };
      _dragEndHandler = function (event) {
        _trigger.apply(CCNBridge, ['dragend', event]);
      };
      _dragEnterHandler = function (event) {
        _trigger.apply(CCNBridge, ['dragenter', event]);
      };
      _dragOverHandler = function (event) {
        _trigger.apply(CCNBridge, ['dragover', event]);
      };
      _dragLeaveHandler = function (event) {
        _trigger.apply(CCNBridge, ['dragleave', event]);
      };
      _dropHandler = function (event) {
        _trigger.apply(CCNBridge, ['drop', event]);
      };
      _scrollHandler = function (event) {
        _trigger.apply(CCNBridge, ['scroll', event]);
      };
      _rotateStartHandler = function (event) {
        _trigger.apply(CCNBridge, ['rotatestart', event]);
      };
      _rotateHandler = function (event) {
        _trigger.apply(CCNBridge, ['rotate', event]);
      };
      _rotateEndHandler = function (event) {
        _trigger.apply(CCNBridge, ['rotateend', event]);
      };
      _zoomHandler = function (event) {
        _trigger.apply(CCNBridge, ['zoom', event]);
      };
      _on = function () {
        window.addEventListener('click', _clickHandler, false);
        window.addEventListener('dblclick', _doubleClickHandler, false);
        window.addEventListener('mousedown', _mouseDownHandler, false);
        window.addEventListener('mousemove', _mouseMoveHandler, false);
        window.addEventListener('mouseup', _mouseUpHandler, false);
        window.addEventListener('touchstart', _touchStartHandler, false);
        window.addEventListener('touchmove', _touchMoveHandler, false);
        window.addEventListener('touchend', _touchEndHandler, false);
        window.addEventListener('dragstart', _dragStartHandler, false);
        window.addEventListener('drag', _dragHandler, false);
        window.addEventListener('dragend', _dragEndHandler, false);
        window.addEventListener('dragenter', _dragEnterHandler, false);
        window.addEventListener('dragover', _dragOverHandler, false);
        window.addEventListener('dragleave', _dragLeaveHandler, false);
        window.addEventListener('drop', _dropHandler, false);
        window.addEventListener('scroll', _scrollHandler, false);
        window.addEventListener('rotatestart', _rotateStartHandler, false);
        window.addEventListener('rotate', _rotateHandler, false);
        window.addEventListener('rotateend', _rotateEndHandler, false);
        window.addEventListener('zoom', _zoomHandler, false);
      };
      _off = function () {
        window.removeEventListener('click', _clickHandler, false);
        window.removeEventListener('dblclick', _doubleClickHandler, false);
        window.removeEventListener('mousedown', _mouseDownHandler, false);
        window.removeEventListener('mousemove', _mouseMoveHandler, false);
        window.removeEventListener('mouseup', _mouseUpHandler, false);
        window.removeEventListener('touchstart', _touchStartHandler, false);
        window.removeEventListener('touchmove', _touchMoveHandler, false);
        window.removeEventListener('touchend', _touchEndHandler, false);
        window.removeEventListener('dragstart', _dragStartHandler, false);
        window.removeEventListener('drag', _dragHandler, false);
        window.removeEventListener('dragend', _dragEndHandler, false);
        window.removeEventListener('dragenter', _dragEnterHandler, false);
        window.removeEventListener('dragover', _dragOverHandler, false);
        window.removeEventListener('dragleave', _dragLeaveHandler, false);
        window.removeEventListener('drop', _dropHandler, false);
        window.removeEventListener('scroll', _scrollHandler, false);
        window.removeEventListener('rotatestart', _rotateStartHandler, false);
        window.removeEventListener('rotate', _rotateHandler, false);
        window.removeEventListener('rotateend', _rotateEndHandler, false);
        window.removeEventListener('zoom', _zoomHandler, false);
      };
      return {
        'on': _on,
        'off': _off
      };
    })(this);

    window.addEventListener('load', function (event) {
      // On page load : bind _events _on window object by default
      _windowListener.on();
    });

    /**
     * Get _listeners
     *
     * @public
     * @return array
     */
    _getListeners = function () {
      return _listeners;
    };

    /**
     * Get _events
     *
     * @public
     * @return array
     */
    _getEvents = function () {
      return _events;
    };

    // Methods
    /**
     * Register a callback for an event
     * @throws Will throw an error if the eventType is unknown
     * @public
     */
    _on = function (eventType, callback, scope) {
      var _listenerType;
      scope = scope || window;

      // Check if the event-type is defined by this API
      if (!(eventType in _events)) {
        throw 'Impossible to bind event : ' + eventType;
      }

      _listenerType = _events[eventType];

      // Push a new _listener that will be executed when this event will occur
      _listeners[_listenerType].push({
        'scope': scope,
        'callback': callback
      });
    };

    /**
     * Alias for "on" method with click event-type
     *
     * @public
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onClick = function (callback, scope) {
      this._on('click', callback, scope);
    };

    /**
     * Alias for "on" method with double-click event-type
     *
     * @public
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDoubleClick = function (callback, scope) {
      this._on('dblclick', callback, scope);
    };

    /**
     * Alias for "on" method with handle event-type
     *
     * @public
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onHandle = function (callback, scope) {
      this._on('handle', callback, scope);
    };

    /**
     * Alias for "on" method with move event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onMove = function (callback, scope) {
      this._on('move', callback, scope);
    };

    /**
     * Alias for "on" method with release event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onRelease = function (callback, scope) {
      this._on('release', callback, scope);
    };

    /**
     * Alias for "on" method with dragstart event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDragStart = function (callback, scope) {
      this._on('dragstart', callback, scope);
    };

    /**
     * Alias for "on" method with drag event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDrag = function (callback, scope) {
      this._on('drag', callback, scope);
    };

    /**
     * Alias for "on" method with dragend event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDragEnd = function (callback, scope) {
      this._on('dragend', callback, scope);
    };

    /**
     * Alias for "on" method with dragenter event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDragEnter = function (callback, scope) {
      this._on('dragenter', callback, scope);
    };

    /**
     * Alias for "on" method with dragover event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDragOver = function (callback, scope) {
      this._on('dragover', callback, scope);
    };

    /**
     * Alias for "on" method with dragleave event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDragLeave = function (callback, scope) {
      this._on('dragleave', callback, scope);
    };

    /**
     * Alias for "on" method with drop event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onDrop = function (callback, scope) {
      this._on('drop', callback, scope);
    };

    /**
     * Alias for "on" method with scroll event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onScroll = function (callback, scope) {
      this._on('scroll', callback, scope);
    };

    /**
     * Alias for "on" method with rotatestart event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onRotateStart = function (callback, scope) {
      this._on('rotatestart', callback, scope);
    };

    /**
     * Alias for "on" method with rotate event-type
     *
     * @public
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onRotate = function (callback, scope) {
      this._on('rotate', callback, scope);
    };

    /**
     * Alias for "on" method with rotateend event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onRotateEnd = function (callback, scope) {
      this._on('rotateend', callback, scope);
    };

    /**
     * Alias for "on" method with zoom event-type
     *
     * @param {function} callback - The callback to execute
     * @param {object} scope - The optionnal callback's scope
     */
    _onZoom = function (callback, scope) {
      this._on('zoom', callback, scope);
    };

    /**
     * Unregister _one or several previously registred callbacks
     *
     * warning: This should not work for anonymous callbacks
     *
     * @param {string} eventType - The event type to unregister
     * @param {function} callback - The callback to unregister
     * @param {object} scope - The callback's scope (default: window)
     *
     * Note : if no callback is provided, this method will unregister every callbacks for the given eventType
     * Note : if no eventType is provided, this method will unregister every callbacks for every _events
     */
    _off = function (eventType, callback, scope) {
      var _listenerType, _listenersList, indexOfCallbackInList, index;
      scope = scope || window;

      // Check if the event-type is defined by this API
      if (eventType && eventType in _events) {
        _listenerType = _events[eventType];

        if (callback) {
          // Get the current _listeners list for the given event
          _listenersList = _listeners[_listenerType];
          // Get the callback index in the list
          indexOfCallbackInList = function (list, callback, scope) {
            var l;
            l = list.length - 1;
            while (l >= 0) {
              var item;
              item = list[l];
              // Compare both callback and scope
              if (item.scope === scope && item.callback === callback) {
                return l;
              }
              l = l - 1;
            }

            return -1;
          };
          index = indexOfCallbackInList(_listenersList, callback, scope);

          // If the callback is found, remove it from the list
          if (index > (-1)) {
            _listenersList.splice(index, 1);
          }
        } else {
          // If the callback is not given, remove all callbacks of the event
          _listeners[_listenerType] = [];
        }
      } else {
        // If the event is not given, remove all callbacks of all _events
        _listeners = {
          'translation': [],
          'rotation': [],
          'zoom': []
        };
      }
    };

    /**
     * Alias for "off" method with click event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offClick = function (callback, scope) {
      this._off('click', callback, scope);
    };

    /**
     * Alias for "off" method with double-click event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offDoubleClick = function (callback, scope) {
      this._off('double-click', callback, scope);
    };

    /**
     * Alias for "off" method with handle event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offHandle = function (callback, scope) {
      this._off('handle', callback, scope);
    };

    /**
     * Alias for "off" method with move event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offMove = function (callback, scope) {
      this._off('move', callback, scope);
    };

    /**
     * Alias for "off" method with release event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offRelease = function (callback, scope) {
      this._off('release', callback, scope);
    };

    /**
     * Alias for "off" method with drag event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offDrag = function (callback, scope) {
      this._off('drag', callback, scope);
    };

    /**
     * Alias for "off" method with drop event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offDrop = function (callback, scope) {
      this._off('drop', callback, scope);
    };

    /**
     * Alias for "off" method with scroll event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offScroll = function (callback, scope) {
      this._off('scroll', callback, scope);
    };

    /**
     * Alias for "off" method with rotatestart event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offRotateStart = function (callback, scope) {
      this._off('rotatestart', callback, scope);
    };

    /**
     * Alias for "off" method with rotate event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offRotate = function (callback, scope) {
      this._off('rotate', callback, scope);
    };

    /**
     * Alias for "off" method with rotateend event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offRotateEnd = function (callback, scope) {
      this._off('rotateend', callback, scope);
    };

    /**
     * Alias for "off" method with zoom event-type
     *
     * @param {function} callback - The callback to cancel
     * @param {object} scope - The optionnal callback's scope
     */
    _offZoom = function (callback, scope) {
      this._off('zoom', callback, scope);
    };

    /**
     * Alias for "off" method with optionnal eventType
     *
     * @param {string} eventType - The optionnal eventType for which all callbacks will be canceled
     */
    _removeAllListeners = function (eventType) {
      this._off(eventType);
    };

    /**
     * messages reference
     * Send and listen for QtFramework system messages
     *
     * @private
     */
    _messages = (function (bridge, qtframework) {
      var _listeners,
          _send,
          _onMessage,
          _offMessage,
          _trigger;

      _listeners = {
        'messages': []
      };

      /**
       * Send a message to the system
       *
       * @param {function} message - The message to send
       * @public
       */
      _send = function (message) {
        if ((!(qtframework)) || (typeof qtframework.send === 'undefined')) {
          window.console.warn('The QtFramework system class does not yet support message reception');
        } else {
          qtframework.send.apply(qtframework, message);
        }
      };

      /**
       * Register a callback to be executed when the system triggers a message
       *
       * @param {function} callback - The callback to execute.
       * @param {object} scope - The optionnal callback's scope.
       * @public
       */
      _onMessage = function (callback, scope) {
        scope = scope || window;

        if ((!(qtframework)) || (typeof qtframework.onMessage === 'undefined')) {
          window.console.warn('The QtFramework system class does not yet support message sending');
        } else {
          scope = scope || window;
          // Push a new _listener that will be executed when a message is received from the system
          _listeners.messages.push({
            'callback': callback,
            'scope': scope
          });
        }
      };

      /**
       * Cancel a callback when the system triggers a message
       *
       * @param {function} callback - The callback to execute.
       * @param {object} scope - The optionnal callback's scope.
       * @public
       */
      _offMessage = function (callback, scope) {
        var indexOfCallbackInList, index;
        scope = scope || window;

        if ((!(qtframework)) || (typeof qtframework.onMessage === 'undefined')) {
          window.console.warn('The QtFramework system class does not yet support message sending');
        } else {
          if (callback) {
            // Get the callback index in the list
            indexOfCallbackInList = function (list, callback, scope) {
              var l;
              l = list.length - 1;
              while (l >= 0) {
                var item;
                item = list[l];
                // Compare both callback and scope
                if (item.scope === scope && item.callback === callback) {
                  return l;
                }
                l = l - 1;
              }

              return -1;
            };
            index = indexOfCallbackInList(_listeners.messages, callback, scope);

            // If the callback is found, remove it from the list
            if (index > (-1)) {
              _listeners.messages.splice(index, 1);
            }
          } else {
            // If the callback is not given, remove all callbacks
            _listeners.messages = [];
          }
        }
      };

      /**
       * Listen for the system to send a message
       *
       * @param {object} event - The system message event to trigger
       * @private
       */
      _trigger = function (event) {
        var l;
        l = _listeners.messages.length - 1;

        while (l >= 0) {
          // For each callback, execute it with the given scope
          var listener;
          listener = _listeners.messages[l];
          listener.callback.apply(listener.scope, [event]);
          l = l - 1;
        }
      };

      /**
       * Listen for the system to send a message
       */
      window.addEventListener('coconote:message', _trigger, false);

      /**
       * @public
       */
      return {
        'send': _send,
        'onMessage': _onMessage,
        'offMessage': _offMessage
      };
      /**
       * @todo define QtFramework argument
       */
    })(this, null);

    // Public scope : return all accessible methods
    /**
     * @public
     */
    return {
      'getEvents': _getEvents,
      'getListeners': _getListeners,
      'on': _on,
      'onClick': _onClick,
      'onHandle': _onHandle,
      'onMove': _onMove,
      'onRelease': _onRelease,
      'onDragStart': _onDragStart,
      'onDrag': _onDrag,
      'onDragEnd': _onDragEnd,
      'onDragEnter': _onDragEnter,
      'onDragOver': _onDragOver,
      'onDragLeave': _onDragLeave,
      'onDrop': _onDrop,
      'onScroll': _onScroll,
      'onRotateStart': _onRotateStart,
      'onRotate': _onRotate,
      'onRotateEnd': _onRotateEnd,
      'onZoom': _onZoom,
      'off': _off,
      'offClick': _offClick,
      'offHandle': _offHandle,
      'offMove': _offMove,
      'offRelease': _offRelease,
      'offDragStart': _offDragStart,
      'offDrag': _offDrag,
      'offDragEnd': _offDragEnd,
      'offDragEnter': _offDragEnter,
      'offDragOver': _offDragOver,
      'offDragLeave': _offDragLeave,
      'offDrop': _offDrop,
      'offScroll': _offScroll,
      'offRotateStart': _offRotateStart,
      'offRotate': _offRotate,
      'offRotateEnd': _offRotateEnd,
      'offZoom': _offZoom,
      'removeAllListeners': _removeAllListeners,
      'messages': _messages
    };
  })();

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = CCNBridge;
    }
    exports.CCNBridge = CCNBridge;
  }
})(this);
