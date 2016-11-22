### 

### 3.0.1

Fix - remove support for IE6. Removes the iframe polling mode.

### 3.0.0

Allow multiple instances of location-bar on the same change, each one can have it's own listeners, each one can initiate navigation.

### 2.1.0

* Make it possible to pass custom `location` and `history` objects to `start` - mostly intended for testing

### 2.0.0

* Query param support. Backbone 1.0.0 had no support for query params (and an inconsistency between pushState and hashChange where query params where stripped from the fragment before calling handlers in hashChange mode, but not when using pushState). Backbone `e6f8f7` adds full support for query params which is now also available in location-bar. The `onChange` and `route` callbacks will now get the fragment including the query params and `update` can be passed in a fragment with query params as well.
