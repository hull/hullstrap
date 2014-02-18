/**
 * borderMenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

function BorderMenu(el, options) {
  this.el = el;
  this.$el = $(el);
  this.options = options||{};
  this.init();
}

BorderMenu.prototype = {
  init: function() {
    var menu = this.$el;
    var trigger = null;

    if(this.options.trigger){
      trigger = $(this.options.trigger);
    }

    var trigger = trigger || menu.find('a.bt-menu-trigger');
    var eventtype = mobilecheck() ? 'touchstart' : 'click';

    var overlay = $('<div>').addClass('bt-overlay');
    menu.append(overlay);

    var resetMenu = function() {
      menu.removeClass('bt-menu-open');
      menu.addClass('bt-menu-close');
    };

    var closeClickFn = function(ev) {
      resetMenu();
      overlay.off(eventtype, closeClickFn);
    };


    trigger.on(eventtype, function(ev) {
      ev.stopPropagation();
      ev.preventDefault();

      if (menu.hasClass('bt-menu-open')) {
        resetMenu();
      } else {
        menu.removeClass('bt-menu-close');
        menu.addClass('bt-menu-open');
        overlay.on(eventtype, closeClickFn);
      }
    });
  }

}

$.fn.borderMenu = function(options) {
  this.borderMenu = new BorderMenu(this, options);
  return this;
}
