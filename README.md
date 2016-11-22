# location-bar

This is a microlib for managing browser's location bar - updating it and listening to changes. It supports `pushState` and `hashChange` APIs and nicely falls back from pushState -> hashChange -> polling. This library is extracted from Backbone.js to turn it into a small building block for other libraries such as [Cherrytree](https://github.com/KidkArolis/cherrytree), [router.js](https://github.com/tildeio/router.js), your [Ember.js application](https://github.com/emberjs/ember.js), etc..

Some more features

  * no dependencies on underscore, jQuery or Backbone (or anything else)
  * support for AMD and CJS module systems
  * available in npm and bower


## Adapted Original Backbone Docs

LocationBar serves as a global router (per frame) to handle hashchange events or pushState, match the appropriate route, and trigger callbacks.

pushState support exists on a purely opt-in basis. Older browsers that don't support pushState will continue to use hash-based URL fragments, and if a hash URL is visited by a pushState-capable browser, it will be transparently upgraded to the true URL. Note that using real URLs requires your web server to be able to correctly render those pages, so back-end changes are required as well. For example, if you have a route of /documents/100, your web server must be able to serve that page, if the browser visits that URL directly. For full search-engine crawlability, it's best to have the server generate the complete HTML for the page ... but if it's a web application, just rendering the same content you would have for the root URL, and filling in the rest with JavaScript works fine.


## Install

    npm install location-bar

or

    bower install location-bar


## Example Usage

```js
var LocationBar = require("location-bar");
var locationBar = new LocationBar();

// listen to all changes to the location bar
locationBar.onChange(function (path) {
  console.log("the current url is", path);
});

// listen to a specific change to location bar
// e.g. Backbone builds on top of this method to implement
// it's simple parametrized Backbone.Router
locationBar.route(/some\-regex/, function () {
  // only called when the current url matches the regex
});

locationBar.start({
  pushState: true
});

// update the address bar and add a new entry in browsers history
locationBar.update("/some/url?param=123");

// update the address bar but don't add the entry in history
locationBar.update("/some/url", {replace: true});

// update the address bar and call the `change` callback
locationBar.update("/some/url", {trigger: true});
```


## API

### locationBar.start(options)

start listening to URL changes. Default options are:

```js
{
  pushState: false,
  hashChange: true,
  root: "/",
  silent: false,
  location: window.location,
  history: window.history
}
```

If you'd like to use pushState, but have browsers that don't support it natively use full page refreshes instead, you can add {hashChange: false} to the options.

If your application is not being served from the root url / of your domain, be sure to tell LocationBar where the root really is, as an option: `locationBar.start({pushState: true, root: "/public/search/"})`

When called, if a route succeeds with a match for the current URL, `locationBar.start()` returns true. If no defined route matches the current URL, it returns false.

If the server has already rendered the entire page, and you don't want the initial route to trigger when starting LocationBar, pass silent: true.

Because hash-based history in Internet Explorer relies on an `<iframe>`, be sure to only call start() after the DOM is ready.

### locationBar.stop()

stop listening to URL changes.

### locationBar.onChange(callback)

Get notified every time URL changes

### locationBar.route(regex, callback)

Get notified every time URL changes and matches a certain regex

### locationBar.update(path, options)

Update the location bar with a new URL. Default options are:

```js
{
  trigger: false,
  replace: false,
}
```

### locationBar.hasPushState()

Checks if the browser has pushState support. Not all browsers support pushState, and if you choose to opt in pushstate when starting locationBar via `locationBar.start({pushState: true})` - locationBar will fallback to `hashchange` or `polling` on old browsers. In those cases it might be useful to check wether the browser hasPushState, because you might want to generate URLs in your application appropriately (add # for non pushState browsers).

## Tests, etc.

The full original `Backbone.Router` tests from Backbone project are being run after replacing Backbone.history with locationBar to make sure full compatiblity, and some aditional tests (for new methods) have been added as well.

The code and tests are adapted from Backbone 1.1.2 (commit 53f77901a4ea9c7cf75d3db93ddddf491998d90f)
