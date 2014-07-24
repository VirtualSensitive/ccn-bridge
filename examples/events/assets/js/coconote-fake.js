(function () {
  'use strict';
  var randomExecutionTimeWidth,
    events,
    triggerEvent;

  randomExecutionTimeWidth = 3000;

  events = ['rotate', 'zoom'];

  triggerEvent = function () {
    var eventIndex,
      eventName,
      eventsList,
      l;

    eventIndex = parseInt(Math.random() * events.length);
    eventName = events[eventIndex];

    eventsList = [];

    switch (eventName) {
      case 'rotate':
        eventsList.push(new CustomEvent('rotatestart', {
          'date': new Date()
        }));
        eventsList.push(new CustomEvent('rotate', {
          'date': new Date(),
          'alpha': parseInt(Math.random() * 361)
        }));
        eventsList.push(new CustomEvent('rotate', {
          'date': new Date(),
          'alpha': parseInt(Math.random() * 361)
        }));
        eventsList.push(new CustomEvent('rotate', {
          'date': new Date(),
          'alpha': parseInt(Math.random() * 361)
        }));
        eventsList.push(new CustomEvent('rotateend', {
          'date': new Date()
        }));
        break;
      case 'zoom':
        eventsList.push(new CustomEvent('zoom', {
          'date': new Date()
        }));
        break;
    }

    l = eventsList.length;

    while (l > 0) {
      var e;
      e = eventsList.pop();
      if (e) {
        window.dispatchEvent(e);
      }
      l = l-1;
    }

    setTimeout(triggerEvent, parseInt(Math.random() * randomExecutionTimeWidth));
  };

  setTimeout(triggerEvent, parseInt(Math.random() * randomExecutionTimeWidth));
})();
