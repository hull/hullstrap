<link rel="stylesheet" href="/drop/css/drop-theme-basic.css" />
<link rel="stylesheet" href="/drop/css/drop-theme-arrows-bounce.css" />
<link rel="stylesheet" href="/drop/css/drop-theme-arrows-bounce-dark.css" />
<script src="/drop/drop.min.js"></script>
<script>
  $(function(){
    $('.drop-target').each(function(){
      var options = $.extend({}, {
        target: this,
        classes: 'drop-theme-arrows-bounce-dark',
        position: 'bottom left',
        constrainToWindow: true,
        constrainToScrollParent: true,
        openOn: 'click'
      }, $(this).data('options'));
      
      new Drop(options);
    }) 
  });
</script>

## Drop

Drop is a Javascript and CSS library for creating dropdowns and other popups attached to elements on the page. Drop uses [Tether.js](http://github.hubspot.com/tether) to efficiently position its elements.

Thank you for considering Drop, we believe it's the best way of creating dropdown-style elements available right now.

### Features

Because Drop is built on [Tether](http://github.hubspot.com/tether), you get all of the benefits of its effecient and powerful positioning.

- Drops automatically reposition on page resizes and scrolls, reorienting to stay in view.
- Drop uses GPU accelerated positioning to maintain 60fps scrolling, even with dozens or hundreds of drops on screen and complex animation
- Drops can be nested within other drops
- Drops can be attached to any of 12 attachment points on the target, or you can leverage the full power of Tether to position your drop anywhere.
- Drops can be configured to open when the user clicks or hovers.
- A development team at [HubSpot](http://github.hubspot.com) who care about making it do everything you need.

### Dependencies

None!

### Browser Support

IE9+ and all modern browsers

### Initialization

To initialize a drop, create a `Drop` instance:

```coffeescript
drop = new Drop
  target: document.querySelector('.drop-target')
  content: 'Welcome to the future!'
  position: 'bottom left'
  openOn: 'click'
```

### Methods

These methods can be called on the `Drop` instance returned when creating a drop.

#### `open()`

Opens the drop. Specifically, this adds `drop-open` and other classes to the drop.

#### `close()`

Opens the drop. Specifically, this removes `drop-open` and other classes from the drop. Closed drops will still remain in the DOM.

#### `remove()`

Remove the drop from the DOM.  The drop will be readded when it's next opened.  It can be used as an alternative to `close`.

#### `toggle()`

Will close the drop if opened, and open if closed.

#### `isOpened()`

Returns true if the drop is opened.

#### `position()`

Reposition the drop.  Call if you change the content of the drop or the position of the element its attached to.

#### `destroy()`

Remove the drop along with all of it's event bindings.  Calling any method after `destroy` is undefined.

### Options

The following options can be passed to the drop constructor:

#### `target`

The element (or a selector for an element) the Drop should stay adjacent to on the page.  An action on this element like
a click or hover can be set to open the drop.

#### `content`

The content which should be rendered into the Drop.  Can be a DOM element or an HTML string.

#### `position`

Position specifies the attachment point (on the target) to attach the drop to. Options include:

```coffeescript
'top left'
'left top'
'left middle'
'left bottom'
'bottom left'
'bottom center'
'bottom right'
'right bottom'
'right middle'
'right top'
'top right'
'top center'
```

More information about attachment can be found in the [Tether documentation](http://tether.io).

#### `openOn`

Specifies what event on the target opens the drop. If you set this to `undefined` or `null` you will need to manually call `.open()`/`.close()` on the `drop` instance.
`'always'` will open the drop immediately when it's rendered and leave it open.

```coffeescript
'click'
'hover'
'always'
```

#### `constrainToWindow`

If set to `true`, uses [Tether's](http://github.hubspot.com/tether) `constraints` list to flip the drop when it would otherwise be outside the viewport. This will cause drops with bottom attachments to switch to top when colliding with the bottom of the page and vice-versa. Dropdowns will not pin to the edge of the window if the user scrolls away from the target after opening a drop, but you can add that behavior by adding constraints through the `tetherOptions` option.

```coffeescript
true
false
```

#### `constrainToScrollParent`

Similar to `constrainToWindow` but for the target element's first scroll parent, that is the first parent which has `overflow: auto` or `overflow: scroll` set, or the body, whichever comes first.

#### `classes`

Additional class names to be added to the drop. These can be set to apply a theme (for example, [`drop-theme-arrows-bounce-dark`](https://github.com/HubSpot/drop/blob/master/css/drop-theme-arrows-bounce-dark.css)) and/or they can be set to apply custom styling to child elements of the drop.

#### `remove`

Set to `false` if you'd like the drop element to be removed from the DOM when the drop is closed, and recreated when it's opened.

```coffeescript
true
false
```

#### `tetherOptions`

Additional options can be passed to customize Drop even further. These will get passed to the underlying Tether instance used to position the drop. See the the [Tether documentation](http://tether.io) for more information.  Set to `false` to disable tether.

#### Defaults

The default option values are:

```coffeescript
defaultOptions =
    position: 'bottom left'
    openOn: 'click'
    constrainToWindow: true
    constrainToScrollParent: true
    classes: ''
    tetherOptions: {}
```

### Events

The drop instance has a few additional methods which are used for event binding:

- `on(eventName, handler, [ctx])`
- `off(eventName, [handler])`
- `once(eventName, handelr, [ctx])`

The following events are fired:

- `open`
- `close`

### Changing Content

You can access the DOM element which contains the drop's content at `.content`.  If you manipulate this content, make sure to call `.position()` to ensure that the
drop remains positioned correctly.

### Body Class

Drop adds a class to the body whenever a drop is open.  It defaults to `drop-open`, see
the Embedding doc for more details.
