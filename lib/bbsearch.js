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

  BBSearch.Result = Backbone.Model.extend({
  });

  BBSearch.Results = Backbone.Collection.extend({
    model: BBSearch.Result,

    initialize: function( opts ){
      this.url = opts.url;
      console.log( "BBSearch.Results.initialize.url", this.url );
    }
  });

  BBSearch.InputView = Backbone.View.extend({
    events: {
      "keypress": "keypress"
    },

    keypress: function( event ){
      console.log( "loading..." );
      this.collection.fetch({
        data: { q: this.$el.val() },
        success: function(){ console.log( "...end loading" ) }
      });
    }
  });

  BBSearch.ResultView = Backbone.View.extend({
    tagName: "li",

    attributes: {
      "class": "bb-search-result"
    },

    events: {
      "click": "click"
    },

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },

    click: function(){
      console.log( "onClick" );
    }
  });

  BBSearch.ResultsView = Backbone.View.extend({
    initialize: function( opts ){
      this.collection.on( 'reset', this.render, this );
    },

    render: function(){
      var ulElement = this.$el.find( "ul.bb-search-results" ).empty();

      this.collection.each( function( model ) {
        var view = new BBSearch.ResultView({ template: this.options.itemTemplate, model: model });
        ulElement.append( view.render().el );
      }, this );
    }
  });

  BBSearch.initialize = function( opts ){
    console.log( "bbSearch.initialize", opts );

    this.url              = opts.url;
    this.inputElement     = opts.inputElement;
    this.resultsElement   = opts.resultsElement;
    this.loadingElement   = opts.loadingElement;
    this.itemTemplate     = opts.itemTemplate;
    this.onClick          = opts.onClick;
    this.onRequest        = opts.onRequest;
    this.onResponse       = opts.onResponse;

    this.results = new BBSearch.Results({
      url: this.url,
    });

    this.inputView = new BBSearch.InputView({
      el: this.inputElement,
      collection: this.results,
    });

    this.resultsView = new BBSearch.ResultsView({
      el: this.resultsElement,
      collection: this.results,
      itemTemplate: this.itemTemplate
    });
  };

  jQuery.fn.bbsearch = function( opts ){
    this.each( function( index, inputElement ){
      opts.inputElement = inputElement;
      var bbSearch = new BBSearch.initialize( opts );
    });
  };

});
