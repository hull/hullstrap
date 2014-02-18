/**
 * cbpScroller.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

'use strict';

var docElem = window.document.documentElement;

function getViewportH() {
  var client = docElem['clientHeight'],
    inner = window['innerHeight'];

  if (client < inner)
    return inner;
  else
    return client;
}

function scrollY() {
  return window.pageYOffset || docElem.scrollTop;
}

// http://stackoverflow.com/a/5598797/989439

function getOffset(el) {
  var offsetTop = 0,
    offsetLeft = 0;
  do {
    if (!isNaN(el.offsetTop)) {
      offsetTop += el.offsetTop;
    }
    if (!isNaN(el.offsetLeft)) {
      offsetLeft += el.offsetLeft;
    }
  } while (el = el.offsetParent)

  return {
    top: offsetTop,
    left: offsetLeft
  }
}


function CbpScroller(el, options) {
  this.el = $(el).get();
  this.$el = $(el);
  this.options = $.extend(this.defaults, options);
  this._init();
}

CbpScroller.prototype = {
  defaults: {
    // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
    // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
    // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
    viewportFactor: 0.2
  },
  _inViewport: function(el, h){
    var elH = el.offsetHeight;
    var scrolled = this.$window.scrollTop()
    var viewed = scrolled+this.$window.height();
    var elTop = $(el).offset().top;
    var elBottom = elTop+elH;
    // if 0, the element is considered in the viewport as soon as it enters.
    // if 1, the element is considered in the viewport only when it's fully inside
    // value in percentage (1 >= h >= 0)
    h = h || 0;
    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
  },

  _init: function() {
    this.$window = $(window);
    this.sections = this.$el.find('.cbp-so-section');
    this.didScroll = false;

    var self = this;
    // the sections already shown...
    this.sections.each(function(i, el) {
      if (!self._inViewport(el)) {
        $(el).addClass('cbp-so-init');
      }
    });

    var scrollHandler = function() {
      if (!self.didScroll) {
        self.didScroll = true;
        setTimeout(function() {
          self._scrollPage();
        }, 60);
      }
    },
      resizeHandler = function() {
        function delayed() {
          self._scrollPage();
          self.resizeTimeout = null;
        }
        if (self.resizeTimeout) {
          clearTimeout(self.resizeTimeout);
        }
        self.resizeTimeout = setTimeout(delayed, 200);
      };

    window.addEventListener('scroll', scrollHandler, false);
    window.addEventListener('resize', resizeHandler, false);
  },
  _scrollPage: function() {
    var self = this;

    this.sections.each(function(i, el) {
      if (self._inViewport(el, self.options.viewportFactor)) {
        $(el).addClass('cbp-so-animate');
      } else {
        // this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scroll
        $(el).addClass('cbp-so-init');
        $(el).removeClass('cbp-so-animate');
      }
    });
    this.didScroll = false;
  }
}

// add to global namespace
$.fn.cbpScroller = function(options) {
  this.cbpScroller = new CbpScroller(this, options);
  return this;
}
