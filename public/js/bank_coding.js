$(function () {
  $( "#bank_coding_input" ).change(function() {
    var value = this.value;
    $.get( "/bank_coding_to_regex?value=" + value, function( data ) {
      $( "#bank_coding_result" ).val( data );
    });
  });
});
