describe( "BBSearch", function(){
  var bbsearch =
    new BBSearch({
      url: "http://search.com/q=",
      inputElement: $("#bbsearch-input"),
      resultsElement: $("#bbsearch-results"),
      elementTemplate: "<%= field_1 %>, <%= field_2 %>"
    });

  afterEach(function() {
  });

  describe("Search", function() {
    it("should fill the results container", function() {
      expect( $("#section-2 .mdm-buttons").length ).toEqual( 1 )
    });
  });

});
