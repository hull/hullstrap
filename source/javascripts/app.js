//= require bootstrap
//= require modernizr/modernizr
//= require spin.js/spin
//= require ladda/js/ladda

//= require_tree ./vendor
//= require_tree ./utils
//= require_tree ./modules

$(function(){
  Ladda.bind( '.ladda-button', { timeout: 15000 } );
})
