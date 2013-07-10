
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
// Fahrenheit slider
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
// Meters slider
function render_meters_slider(value) {
    $('#m-slider').slider({
        range: "min",
        min: 0,
        max: 97,
        value: value,
        slide: function (event, ui) {
            $.get('/meters_to_feet?value=' + ui.value, function(data) {
              res = $.parseJSON(data);
              $("#m-amount").html(ui.value);
              $("#ft-amount").html(res.feet);
              render_feet_slider(res.feet);
            });
        }
    });
}
// Feet slider
function render_feet_slider(value) {
    $('#ft-slider').slider({
        range: "min",
        min: 0,
        max: 320,
        value: value,
        slide: function (event, ui) {
            $.get('/feet_to_meters?value=' + ui.value, function(data) {
              res = $.parseJSON(data);
              $("#ft-amount").html(ui.value);
              $("#m-amount").html(res.meters);
              render_meters_slider(res.meters);
            });
        }
    });
}
$(function () {

    render_celcius_slider(20);
    render_fahrenheit_slider(68);
    $("#c-amount").html($("#c-slider").slider("value"));
    $("#f-amount").html($("#f-slider").slider("value"));

    render_meters_slider(10);
    render_feet_slider(32.8);
    $("#m-amount").html($("#m-slider").slider("value"));
    $("#ft-amount").html($("#ft-slider").slider("value"));

});