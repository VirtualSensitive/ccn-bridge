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

// CCNBridge Revealing Module
var CCNBridge = (function () {
  'use strict';

  // Variables
  var events,
      getEvents,
      listeners,
      getListeners,
      on,
      off;

  events = {
    'translate': 'translation',
    'rotate': 'rotation',
    'zoom': 'zoom'
  };

  listeners = {
    'translation': [],
    'rotation': [],
    'zoom': []
  };

  // Methods
  /**
   * Register a callback to an event
   */
  on = function (eventType, callback, scope) {
    var listenerType;
    scope = scope || window;

    if (!(eventType in events)) {
      throw 'Impossible to bind event : ' + eventType;
    }

    listenerType = events[eventType];

    listeners[listenerType].push({
      'scope': scope,
      'callback': callback
    });
  };

  /**
   * Unregister a previously registred callback to an event
   * This do not works for anonymous callbacks
   */
  off = function (eventType, callback, scope) {
    var listenerType, listenersList, indexOfCallbackInList, index;
    scope = scope || window;

    if (eventType && eventType in events) {
      listenerType = events[eventType];

      if (callback) {
        listenersList = listeners[listenerType];
        indexOfCallbackInList = function (list, callback, scope) {
          var l = list.length - 1;
          while (l >= 0) {
            var item = list[l];
            if (item.scope === scope && item.callback === callback) {
              return l;
            }
            l = l-1;
          }

          return -1;
        };
        index = indexOfCallbackInList(listenersList, callback, scope);

        if (index > (-1)) {
          listenersList.splice(index, 1);
        }
      } else {
        listeners[listenerType] = [];
      }
    } else {
      listeners = {
        'translation': [],
        'rotation': [],
        'zoom': []
      };
    }
  };

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

  // Public scope
  return {
    'getEvents': getEvents,
    'getListeners': getListeners,
    'on': on,
    'off': off
  };
})();

module.exports = CCNBridge;
