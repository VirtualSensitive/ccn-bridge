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
      onRotate,
      onZoom,
      off,
      offRotate,
      offZoom,
      removeAllListeners,
      trigger;

  events = {
    'rotate': 'rotation',
    'zoom': 'zoom'
  };

  listeners = {
    'rotation': [],
    'zoom': []
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
   * Alias for "on" method with rotate event-type
   */
  onRotate = function (callback, scope) {
    this.on('rotate', callback, scope);
  };

  /**
   * Alias for "on" method with zoom event-type
   */
  onZoom = function (callback, scope) {
    this.on('zoom', callback, scope);
  };

  /**
   * Unregister a previously registred callback for (an optionnal) event
   * warning: This should not works for anonymous callbacks
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
   * Alias for "off" method with rotate event-type
   */
  offRotate = function (callback, scope) {
    this.off('rotate', callback, scope);
  };

  /**
   * Alias for "off" method with zoom event-type
   */
  offZoom = function (callback, scope) {
    this.off('zoom', callback, scope);
  };

  /**
   * Unregister all previously registred callbacks for (an optionnal) event
   * warning: This should not works for anonymous callbacks
   */
  removeAllListeners = function (eventType) {
    this.off(eventType);
  };


  /**
   * Trigger method for C++ events
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

  // Public scope : return all accessible methods
  return {
    'getEvents': getEvents,
    'getListeners': getListeners,
    'on': on,
    'onRotate': onRotate,
    'onZoom': onZoom,
    'off': off,
    'offRotate': offRotate,
    'offZoom': offZoom,
    'removeAllListeners': removeAllListeners,
    'trigger': trigger
  };
})();

module.exports = CCNBridge;
