$(function(){
  describe( "BBSearch", function(){
    beforeEach( function(){
      this.options = {
        url: "http://search.com/q=",
        inputElement: $("#bbsearch-input"),
        resultsElement: $("#bbsearch-results"),
        itemTemplate: "<%= field_1 %>, <%= field_2 %>"
      };


      this.fakeData = [
        {
          "field_1": "value_1_a",
          "field_2": "value_2_a",
        },
        {
          "field_1": "value_1_b",
          "field_2": "value_2_b",
        }
      ];
    });

    describe( "BBSearch.Backbone.Results", function(){
      it( "should append query to url", function(){
        spyOn($, "ajax");

        var results = new BBSearch.Backbone.Results({
          searchUrl: "this is the url :"
        });

        results.query = " this is the query";
        results.fetch();

        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual( "this is the url : this is the query" );
      });

      it( "should insert query into url", function(){
        spyOn($, "ajax");

        var results = new BBSearch.Backbone.Results({
          searchUrl: "this is the url : " + BBSearch.Constants.QueryPlaceholder + " : and the end"
        });

        results.query = "this is the query";
        results.fetch();

        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual( "this is the url : this is the query : and the end" );
      });
    });

    describe( "BBSearch", function() {
      // not allow ajax request in test
      $.ajax = function(){
        throw "ajaxShouldBeStubbedOutError"
      };

      beforeEach( function(){
        this.bbsearch = new BBSearch( this.options );
      });

      afterEach( function(){
        this.bbsearch.destroy();
      });

      it( "should fill the results container", function() {
        spyOn( $, "ajax" ).andCallFake( $.proxy( function( options ){
          console.log( "ajax", options.url );
          if( options.url == "http://search.com/q=query" ) options.success( this.fakeData );
        }, this ) );

        this.bbsearch.search( "query" );
        expect( $("#bbsearch-results").html() ).toEqual( "<ul class=\"bbsearch-results\"><li class=\"bbsearch-result\">value_1_a, value_2_a</li><li class=\"bbsearch-result\">value_1_b, value_2_b</li></ul>" );
      });

      it( "should call search() on keypress", function(){
        runs( function(){
          spyOn( this.bbsearch, "search" );

          $("#bbsearch-input").val( "another query" );
          $("#bbsearch-input").keyup();
        });

        waits(600);

        runs( function(){
          expect( this.bbsearch.search ).toHaveBeenCalledWith( "another query" );
        });
      });
    });

    describe( "BBSearch::Handlers", function(){

      it( "should use parseHandler if sent", function() {
        spyOn( $, "ajax" ).andCallFake( $.proxy( function( options ){
          options.success( this.fakeData );
        }, this ) );

        var spy = jasmine.createSpy( "parse" );
        this.options.parse = spy;

        var bbsearch = new BBSearch( this.options );

        bbsearch.search();
        expect( spy ).toHaveBeenCalledWith( this.fakeData, undefined );

        bbsearch.destroy();
      });

      it( "should use clickHander if sent", function() {
        spyOn( $, "ajax" ).andCallFake( $.proxy( function( options ){
          options.success( this.fakeData );
        }, this ) );

        var spy = jasmine.createSpy( "click" );
        this.options.onClick = spy;

        var bbsearch = new BBSearch( this.options );

        bbsearch.search();

        $("#bbsearch-results .bbsearch-result")[0].click();

        expect( spy ).toHaveBeenCalledWith( bbsearch.results.at(0) );

        bbsearch.destroy();
      });

      it( "should use start and end handlers if sent", function() {
        spyOn( $, "ajax" ).andCallFake( $.proxy( function( options ){
          options.success( this.fakeData );
        }, this ) );

        var spyStart = jasmine.createSpy( "start" );
        var spyEnd = jasmine.createSpy( "end" );

        this.options.onStart = spyStart;
        this.options.onEnd = spyEnd;

        var bbsearch = new BBSearch( this.options );

        bbsearch.search();

        expect( spyStart ).toHaveBeenCalled();
        expect( spyEnd ).toHaveBeenCalled();

        bbsearch.destroy();
      });
    });

  });
});