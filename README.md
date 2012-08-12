# BBSearch

JS plugin to transform an _input field_ in a auto-search element based on Backbone.

Check the [demo page](http://fguillen.github.com/BBSearch)

## How it works

BBSearch will be listening to _key events_ in an input field and sending _requests_ to an expecified json URL.

BBSearch will parse the _response_ and render the results into _li_ elements based in the template you have defined.

BBSearch allows to _binding events_ like:

* **onClick**: into one of the results elements
* **onStart**: when the search request start
* **onEnd**: when the search request ends and all the elements have been rendered

## Version

* 0.0.1 (but already in production applications)

## Usage

### Basic configuration

    new BBSearch({
      // (Required) the query will be added at the end of the url
      // you can also use the "#bbsearch-query#" placeholder to insert the query
      // in any part of the url
      url: "http://myapi.server.com/search.json?q=",

      // (Required) reference to the user input field
      inputElement: $("#my-input"),

      // (Required) reference to the DOM element when the search results will be shown
      resultsElement: $("#my-results"),

      // (Required) UnderscoreJS style template
      itemTemplate: "title: <%= title %>"
    });

### Complete configuration

    new BBSearch({
      // (Required) the query will be added at the end of the url
      // you can also use the "#bbsearch-query#" placeholder to insert the query
      // in any part of the url
      url: "http://myapi.server.com/search.json?q=",

      // (Required) reference to the user input field
      inputElement: $("#my-input"),

      // (Required) reference to the DOM element when the search results will be shown
      resultsElement: $("#my-results"),

      // (Required) UnderscoreJS style template
      itemTemplate: "title: <%= title %>",

      // handler for a _click_ in one of the elements
      // a reference to the actual Backbone.Model will be sent
      onClick: function( model ){ $("#my-input").val( model.get( "text" ) ) },

      // handler to be called when the search request start
      onStart: function(){ $("#loading").show();},

      // handler to be called when the search request ends
      // and all the elements have been rendered
      onEnd: function( collection ){ $("#loading").hide(); },

      // in case your search response has especial _parse_ needs
      parse: function( response ){ return response.results; },
    });

## Browsers support

Tested in:

* (OSX) Chrome 21.0.1180.57
* (OSX) Firefox 8.0.1
* (OSX) Safari 6.0

## Dependencies

* [jquery](http://jquery.com)
* [underscorejs](http://underscorejs.org)
* [backbonejs](http://backbonejs.org)

## Install

##### 1. Download [the last version of the code](https://github.com/fguillen/BBSearch/zipball/master).
##### 2. Unzip the package
##### 3. Copy `vendor` and `lib` folders to a _public_ folder in your web application. Let's call it `bbsearch`.
##### 4. Import the dependencies:

    <script src="./bbsearch/vendor/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="./bbsearch/vendor/underscore.js" type="text/javascript" charset="utf-8"></script>
    <script src="./bbsearch/vendor/backbone.js" type="text/javascript" charset="utf-8"></script>

**Note**: if you application is already importing some of the _dependencies_ you have not to do it twice.

##### 5. Import the bbsearch plugin:

    <script src="./bbsearch/lib/bbsearch.js" type="text/javascript" charset="utf-8"></script>

##### 6. You are ready!


## TODO

* check in more browsers


## License

This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
