/**
 * UISearch.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
'use strict';

function SearchBox(el, options) {
  this.el = el;
  this.$el = $(el);
  this.$inputEl = this.$el.find('form > input.sb-search-input');
  this._initEvents();
}

SearchBox.prototype = {
  _initEvents: function() {
    var self = this,
      initSearchFn = function(ev) {
        ev.stopPropagation();
        // trim its value - String.trim is not supported everywhere
        self.$inputEl.val(self.$inputEl.val().replace(/^\s+|\s+$/g, ''));
        if (!self.$el.hasClass('sb-search-open')) { // open it
          ev.preventDefault();
          self.open();
        } else if (self.$el.hasClass('sb-search-open') && /^\s*$/.test(self.$inputEl.val())) { // close it
          ev.preventDefault();
          self.close();
        }
        return false;
      }

    this.$el.on('click', initSearchFn);
    this.$el.on('touchstart', initSearchFn);
    this.$inputEl.on('click', function(ev) {
      ev.stopPropagation();
    });
    this.$inputEl.on('touchstart', function(ev) {
      ev.stopPropagation();
    });
  },
  open: function() {
    var self = this;
    this.$el.addClass('sb-search-open');
    // focus the input
    if (!mobilecheck()) {
      this.$inputEl.focus();
    }

    // close the search input if body is clicked
    var bodyFn = function(ev) {
      self.close();
      $(window).off('click', bodyFn);
      $(window).off('touchstart', bodyFn);
    };
    $(window).on('click', bodyFn);
    $(window).on('touchstart', bodyFn);
  },
  close: function() {
    this.$inputEl.blur();
    this.$el.removeClass('sb-search-open');
  }
}



$.fn.searchBox = function(options) {
  this.searchBox = new SearchBox(this, options);
  return this;
}

// // add to global namespace
// window.SearchBox = SearchBox;
