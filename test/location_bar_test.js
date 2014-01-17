(function() {

  var _ = window.underscore;
  var $ = window.nonGlobaljQuery;
  var LocationBar = window.LocationBar;
  var location;
  var locationBar;

  // QUnit.config.filter = "routes (simple)";

  var Location = function(href) {
    this.replace(href);
  };

  _.extend(Location.prototype, {

    replace: function(href) {
      _.extend(this, _.pick($('<a></a>', {href: href})[0],
        'href',
        'hash',
        'host',
        'search',
        'fragment',
        'pathname',
        'protocol'
      ));
      // In IE, anchor.pathname does not contain a leading slash though
      // window.location.pathname does.
      if (!/^\//.test(this.pathname)) this.pathname = '/' + this.pathname;
    },

    toString: function() {
      return this.href;
    }

  });

  module("location-bar", {

    setup: function() {
      location = new Location('http://example.com');
      window.location.hash = "#setup";
      locationBar = new LocationBar();
      locationBar.interval = 9;
      locationBar.start({pushState: false});
    },

    teardown: function() {
      locationBar.stop();
    }

  });

  asyncTest("route", 1, function() {
    locationBar.route(/^(.*?)$/, function (path) {
      equal(path, 'search/news');
      start();
    });
    window.location.hash = "search/news";
  });

  asyncTest("onChange", 1, function () {
    locationBar.onChange(function (path) {
      equal(path, "some/url?withParam=1&moreParams=2");
      start();
    });
    window.location.hash = "some/url?withParam=1&moreParams=2";
  });

  asyncTest("routes via update", 2, function() {
    locationBar.onChange(function (path) {
      equal(path, "search/manhattan/p20");
      start();
    });
    locationBar.update("search/manhattan/p20", {trigger: true});
    equal(window.location.hash, "#search/manhattan/p20");
  });

  test("routes via update with {replace: true}", 1, function() {
    location.replace('http://example.com#start_here');
    locationBar.location = location;
    locationBar.checkUrl();
    location.replace = function(href) {
      strictEqual(href, new Location('http://example.com#end_here').href);
    };
    locationBar.update('end_here', {replace: true});
  });

  asyncTest("routes via update with query params", 2, function() {
    locationBar.onChange(function (path) {
      equal(path, "search/manhattan/p20?id=1&foo=bar");
      start();
    });
    locationBar.update("search/manhattan/p20?id=1&foo=bar", {trigger: true});
    equal(window.location.hash, "#search/manhattan/p20?id=1&foo=bar");
  });

})();
