
// Celcius slider
function render_celcius_slider(value) {
    $('#c-slider').slider({
        range: "min",
        min: -18,
        max: 100,
        value: value,
        slide: function (event, ui) {
            $.get('/celsius_to_fahrenheit?value=' + ui.value, function(data) {
              res = $.parseJSON(data);
              $("#c-amount").html(ui.value);
              $("#f-amount").html(res.fahrenheit);
              render_fahrenheit_slider(res.fahrenheit);
            });
            
        }
    });
}

function render_fahrenheit_slider(value) {
    $('#f-slider').slider({
        range: "min",
        min: 0,
        max: 212,
        value: value,
        slide: function (event, ui) {
            $.get('/fahrenheit_to_celsius?value=' + ui.value, function(data) {
              res = $.parseJSON(data);
              $("#f-amount").html(ui.value);
              $("#c-amount").html(res.celsius);
              render_celcius_slider(res.celsius);
            });
            
        }
    });
}
$(function () {

    render_celcius_slider(20);
    render_fahrenheit_slider(68);

    $("#c-amount").html($("#c-slider").slider("value"));
    $("#f-amount").html($("#f-slider").slider("value"));

});