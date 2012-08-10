/*
  # BBSearch

  * url: https://github.com/fguillen/BBSearch
  * author: http://fernandoguillen.info
  * demo page: http://fguillen.github.com/BBSearch/

  ## Versión

      v0.0.1

  ## Documentation

  * README: https://github.com/fguillen/BBSearch/blob/master/README.md
*/

$(function(){
  var BBSearch = {};

  BBSearch.Constants = {
    resultsElementClass: "bb-search-results",
    resultElementClass: "bb-search-result",
  };

  BBSearch.Result = Backbone.Model.extend({
  });

  BBSearch.Results = Backbone.Collection.extend({
    model: BBSearch.Result,

    initialize: function( opts ){
      this.urlBase = opts.url;
      this.parse = opts.parse;
      this.url = function(){ return this.urlBase + this.query };
    }
  });

  BBSearch.InputView = Backbone.View.extend({
    events: {
      "keypress": "keypress"
    },

    initialize: function(){
      _.bindAll( this, "onEnd" );
    },

    keypress: function( event ){
      this.onStart();

      this.collection.query = this.$el.val();
      this.collection.fetch({
        success: this.onEnd
      });
    },

    onStart: function(){
      console.log( "onStart" );
      if( this.options.onStart ) this.options.onStart();
    },

    onEnd: function(){
      console.log( "onEnd" );
      if( this.options.onEnd ) this.options.onEnd();
    }
  });

  BBSearch.ResultView = Backbone.View.extend({
    tagName: "li",

    attributes: {
      "class": BBSearch.Constants.resultElementClass
    },

    events: {
      "click": "onClick"
    },

    initialize: function(){
      this.template = _.template( this.options.template );
    },

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

    onClick: function(){
      if( this.options.onClick ) this.options.onClick( this.model );
    }
  });

  BBSearch.ResultsView = Backbone.View.extend({
    initialize: function( opts ){
      this.collection.on( 'reset', this.render, this );
    },

    resetResultsElement: function(){
      if( this.$el.find( "ul." + BBSearch.Constants.resultsElementClass ).length > 0 ){
        this.$el.find( "ul." + BBSearch.Constants.resultsElementClass ).empty();
      } else {
        this.$el.append( "<ul class=\""+ BBSearch.Constants.resultsElementClass + "\"></ul>" );
      }
    },

    render: function(){
      this.resetResultsElement();

      var ulElement = this.$el.find( "ul." + BBSearch.Constants.resultsElementClass );

      this.collection.each( function( model ) {
        var view = new BBSearch.ResultView({
          template: this.options.itemTemplate,
          model: model,
          onClick: this.options.onClick
        });

        ulElement.append( view.render().el );
      }, this );
    }
  });

  BBSearch.initialize = function( opts ){
    this.url              = opts.url;
    this.inputElement     = opts.inputElement;
    this.resultsElement   = opts.resultsElement;
    this.loadingElement   = opts.loadingElement;
    this.itemTemplate     = opts.itemTemplate;
    this.onClick          = opts.onClick;
    this.onStart          = opts.onStart;
    this.onEnd            = opts.onEnd;
    this.parse            = opts.parse;

    this.results = new BBSearch.Results({
      url: this.url,
      parse: this.parse
    });

    this.inputView = new BBSearch.InputView({
      el: this.inputElement,
      collection: this.results,
      onStart: this.onStart,
      onEnd: this.onEnd
    });

    this.resultsView = new BBSearch.ResultsView({
      el: this.resultsElement,
      collection: this.results,
      itemTemplate: this.itemTemplate,
      onClick: this.onClick,
      onStart: this.onStart,
      onEnd: this.onEnd,
    });
  };

  jQuery.fn.bbsearch = function( opts ){
    this.each( function( index, inputElement ){
      opts.inputElement = inputElement;
      var bbSearch = new BBSearch.initialize( opts );
    });
  };

});
