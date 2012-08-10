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
  console.log( "BBSearch::Loading ..." );

  var BBSearch = {};

  BBSearch.Constants = {
    resultsElementClass: "bbsearch-results",
    resultElementClass: "bbsearch-result",
    queryPlaceholder: "#bbsearch-query#"
  };

  BBSearch.Result = Backbone.Model.extend({
  });

  BBSearch.Results = Backbone.Collection.extend({
    model: BBSearch.Result,

    url: function(){
      var result = "";

      if( this.urlBase.indexOf( BBSearch.Constants.queryPlaceholder ) != -1 ){
        result = this.urlBase.replace( BBSearch.Constants.queryPlaceholder, this.query );
      } else {
        result = this.urlBase + this.query;
      }

      console.debug( "BBSearch::SearchingURL", result );

      return result;
    },

    initialize: function( opts ){
      this.urlBase = opts.urlBase;
      this.parse = opts.parse;
    }
  });

  BBSearch.InputView = Backbone.View.extend({
    events: {
      "keyup": "keyup"
    },

    initialize: function(){
      this.previousVal = this.$el.val();
    },

    keyup: function( event ){
      if( this.previousVal != this.$el.val() ) {
        if( this.timer ) clearTimeout( this.timer );
        this.timer = setTimeout( $.proxy( this.search, this ) , 500 );
        this.previousVal = this.$el.val();
      }
    },

    search: function(){
      console.log( "BBSearch::SearchingQuery", this.$el.val() );
      this.options.eventAggregator.trigger( "bbsearch:start" );
      this.collection.query = this.$el.val();
      this.collection.fetch();
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
      this.options.eventAggregator.trigger( "bbsearch:click", this.model );
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
          eventAggregator: this.options.eventAggregator
        });

        ulElement.append( view.render().el );
      }, this );

      this.options.eventAggregator.trigger( "bbsearch:end", this.collection );
    }
  });

  BBSearch.initialize = function( opts ){
    console.debug( "BBSearch::Initializing with opts", opts );

    this.url              = opts.url;
    this.inputElement     = opts.inputElement;
    this.resultsElement   = opts.resultsElement;
    this.loadingElement   = opts.loadingElement;
    this.itemTemplate     = opts.itemTemplate;
    this.onClick          = opts.onClick;
    this.onStart          = opts.onStart;
    this.onEnd            = opts.onEnd;
    this.parse            = opts.parse;

    var eventAggregator = _.extend({}, Backbone.Events);
    if( this.onClick ) eventAggregator.on( "bbsearch:click", this.onClick );
    if( this.onStart ) eventAggregator.on( "bbsearch:start", this.onStart );
    if( this.onEnd ) eventAggregator.on( "bbsearch:end", this.onEnd );

    this.results = new BBSearch.Results({
      urlBase: this.url,
      parse: this.parse
    });

    this.inputView = new BBSearch.InputView({
      el: this.inputElement,
      collection: this.results,
      eventAggregator: eventAggregator
    });

    this.resultsView = new BBSearch.ResultsView({
      el: this.resultsElement,
      collection: this.results,
      itemTemplate: this.itemTemplate,
      eventAggregator: eventAggregator
    });
  };

  jQuery.fn.bbsearch = function( opts ){
    this.each( function( index, inputElement ){
      opts.inputElement = inputElement;
      var bbSearch = new BBSearch.initialize( opts );
    });
  };

  console.log( "... BBSearch::Loaded" );
});
