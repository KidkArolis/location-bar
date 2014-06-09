This backbone.js is a slightly modified version of backbone that we use to run the original Backbone's Router/History test suite.

The only change is removal of `Backbone` variable within the closure. Instead we create `window.Backbone = {}`. This way all references to `Backbone.history/Backbone.History` are referencing the window.Backbone variable instead of local to the closure `var Backbone`. This allows us to swap the `window.Backbone.history` and `window.Backbone.History` with `location-bar` module and run the original Backbone's `Router/History` tests.

This is backbone.js 1.1.2.