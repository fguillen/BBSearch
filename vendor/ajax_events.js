$(function(){
  console.log( "Loading AJAX Event logger" );

  $(document).ajaxSend( function( event, jqXHR, ajaxOptions ){
    console.log( "ajaxSend" );
    console.log( "ajaxSend.event", event );
    console.log( "ajaxSend.jqXHR", jqXHR );
    console.log( "ajaxSend.ajaxOptions", ajaxOptions );
  });

  $(document).ajaxError( function( event, jqXHR, ajaxSettings, thrownError ){
    console.log( "ajaxError" );
    console.log( "ajaxError.event", event );
    console.log( "ajaxError.jqXHR", jqXHR );
    console.log( "ajaxError.ajaxSettings", ajaxSettings );
    console.log( "ajaxError.thrownError", thrownError );
  });

  $(document).ajaxSuccess( function( event, XMLHttpRequest, ajaxOptions ){
    console.log( "ajaxSuccess" );
    console.log( "ajaxSuccess.event", event );
    console.log( "ajaxSuccess.XMLHttpRequest", XMLHttpRequest );
    console.log( "ajaxSuccess.ajaxOptions", ajaxOptions );
  });

  $(document).ajaxComplete( function( event, XMLHttpRequest, ajaxOptions ){
    console.log( "ajaxComplete" );
    console.log( "ajaxComplete.event", event );
    console.log( "ajaxComplete.XMLHttpRequest", XMLHttpRequest );
    console.log( "ajaxComplete.ajaxOptions", ajaxOptions );
  });
});