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

var BBSearch;

$(function(){
  console.log( "BBSearch::Loading ..." );

  BBSearch = function( opts ){
    console.debug( "BBSearch::Initializing with opts", opts );

    // required
    this.url              = opts.url;
    this.inputElement     = opts.inputElement;
    this.resultsElement   = opts.resultsElement;
    this.itemTemplate     = opts.itemTemplate;

    // optional
    this.onClick          = opts.onClick;
    this.onStart          = opts.onStart;
    this.onEnd            = opts.onEnd;
    this.parse            = opts.parse;

    this.initialize = function( opts ){
      this.eventAggregator = _.extend({}, Backbone.Events);
      if( this.onClick ) this.eventAggregator.on( "bbsearch:click", this.onClick );
      if( this.onStart ) this.eventAggregator.on( "bbsearch:start", this.onStart );
      if( this.onEnd ) this.eventAggregator.on( "bbsearch:end", this.onEnd );

      this.results = new BBSearch.Backbone.Results({
        searchUrl: this.url,
        parseHandler: this.parse
      });

      this.inputView = new BBSearch.Backbone.InputView({
        el: this.inputElement,
        bbsearch: this,
      });

      this.resultsView = new BBSearch.Backbone.ResultsView({
        el: this.resultsElement,
        collection: this.results,
        itemTemplate: this.itemTemplate,
        eventAggregator: this.eventAggregator
      });
    };

    this.search = function( query ){
      console.log( "BBSearch::SearchingQuery", query );
      this.eventAggregator.trigger( "bbsearch:start" );
      this.results.query = query;
      this.results.fetch({
        success: function( collection ){ console.debug( "BBSearch::Success", collection ) },
        error: function( response ){ console.debug( "BBSearch::Error", response ) },
      });
    }

    this.destroy = function(){
      this.inputView.undelegateEvents();
      this.results.off();
      this.eventAggregator.off();
    }

    this.initialize( opts );
  };

  BBSearch.Constants = {
    ResultsElementClass: "bbsearch-results",
    ResultElementClass: "bbsearch-result",
    QueryPlaceholder: "#bbsearch-query#"
  };

  BBSearch.Backbone = {}

  BBSearch.Backbone.Result = Backbone.Model.extend({});

  BBSearch.Backbone.Results = Backbone.Collection.extend({
    model: BBSearch.Backbone.Result,

    parse: function( response ){
      console.log( "XXX: response", response );
      return response;
    },

    url: function(){
      var result = "";

      if( this.searchUrl.indexOf( BBSearch.Constants.QueryPlaceholder ) != -1 ){
        result = this.searchUrl.replace( BBSearch.Constants.QueryPlaceholder, this.query );
      } else {
        result = this.searchUrl + this.query;
      }

      console.debug( "BBSearch::SearchingURL", result );

      return result;
    },

    initialize: function( opts ){
      this.searchUrl = opts.searchUrl;
      if( opts.parseHandler ) this.parse = opts.parseHandler;
    }
  });

  BBSearch.Backbone.InputView = Backbone.View.extend({
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
      this.options.bbsearch.search( this.$el.val() );
    }
  });

  BBSearch.Backbone.ResultView = Backbone.View.extend({
    tagName: "li",

    attributes: {
      "class": BBSearch.Constants.ResultElementClass
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

  BBSearch.Backbone.ResultsView = Backbone.View.extend({
    initialize: function( opts ){
      this.collection.on( 'reset', this.render, this );
    },

    resetResultsElement: function(){
      if( this.$el.find( "ul." + BBSearch.Constants.ResultsElementClass ).length > 0 ){
        this.$el.find( "ul." + BBSearch.Constants.ResultsElementClass ).empty();
      } else {
        this.$el.append( "<ul class=\""+ BBSearch.Constants.ResultsElementClass + "\"></ul>" );
      }
    },

    render: function(){
      this.resetResultsElement();

      this.collection.each( function( model ) {
        var view = new BBSearch.Backbone.ResultView({
          template: this.options.itemTemplate,
          model: model,
          eventAggregator: this.options.eventAggregator
        });

        this.$el.find( "ul." + BBSearch.Constants.ResultsElementClass ).append( view.render().el );
      }, this );

      this.options.eventAggregator.trigger( "bbsearch:end", this.collection );
    }
  });

  console.log( "... BBSearch::Loaded" );
});
