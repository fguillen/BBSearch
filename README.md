# BBSearch

jQuery plugin to transform an _input field_ in a auto-search element based on Backbone

Check the [demo page](http://fguillen.github.com/BBSearch)

## How it works

    $(<selector>).bbsearch({

    })

## Version

* 0.0.1 (but already in production applications)

## Usage

### Explicitly

Using the `$(<selector>).mdmagick()` call:

    <textarea id="my-textarea"></textarea>
    <script>
      $(function(){ $("#my-textarea").mdmagick(); })
    </script>

or Implicitly:

Adding the special class `mdm-input` to any input field:

    <textarea class="mdm-input"></textarea>

## Browsers support

Tested in:

* (OSX) Chrome 21.0.1180.57
* (OSX) Firefox 8.0.1
* (OSX) Safari 6.0

## Dependencies

* jquery
* [a-tools](http://archive.plugins.jquery.com/project/a-tools)
* [showdown](https://github.com/coreyti/showdown/)

## Install

##### 1. Download [the last version of the code](https://github.com/fguillen/MDMagick/zipball/master).
##### 2. Unzip the package
##### 3. Copy `vendor`, `lib` and `assets` folders to a _public_ folder in your web application. Let's call it `mdmagick`.
##### 4. Import the dependencies:

    <script src="./mdmagick/vendor/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="./mdmagick/vendor/a-tools.js" type="text/javascript" charset="utf-8"></script>
    <script src="./mdmagick/vendor/showdown.js" type="text/javascript" charset="utf-8"></script>

##### 5. Import the mdmagick plugin:

    <script src="./mdmagick/lib/mdmagick.js" type="text/javascript" charset="utf-8"></script>

##### 6. Import the mdmagick styles and icons

    <link rel="stylesheet" href="./mdmagick/assets/mdmagick.css" ></style>
    <link rel="stylesheet" href="./mdmagick/assets/icon_font/style.css" />
    <!--[if lte IE 7]><script src="./mdmagick/assets/icon_font/lte-ie7.js"></script><![endif]-->

##### 7. You are ready!

**Note**: if you application is already importing some of the _dependencies_ you have not to do it twice.

## TODO

* Check for performance issues
* Improve the slideOut and In animations

## License

This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

## Attributions

* Icons used in the control div from: [IcoMoon](http://keyamoon.com/icomoon/#toHome)