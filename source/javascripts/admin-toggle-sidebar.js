jQuery(document).ready(function($) {
  $sidebar = $('.admin-sidebar-r');

  $(document).on('click', '.js-toggle-sidebar-r', function(e){
    e.preventDefault();
    $sidebar.toggleClass('is-visible');
  });
});
