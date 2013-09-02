$(function () {

  // Render Celcius slider
  function render_celcius_slider(value) {
      celcium_slider.slider({
          range: "min",
          min: -18,
          max: 100,
          value: value,
          slide: function (event, ui) {
            if (_cache.celsius_fahrenheit[ui.value]) {
              update_fahrenheit_slider(ui.value, _cache.celsius_fahrenheit[ui.value]);
            } else {
              $.ajax({
                url:    '/celsius_to_fahrenheit?value=' + ui.value,
                success: function(result) {
                          res = $.parseJSON(result);
                          _cache.celsius_fahrenheit[ui.value] = res.fahrenheit;
                          _cache.fahrenheit_celsius[res.fahrenheit] = ui.value;
                          update_fahrenheit_slider(ui.value, _cache.celsius_fahrenheit[ui.value]);
                        },
                async:   false
              });
            }
          }
      });
  }

  // Update Celcius slider
  function update_celcius_slider(value, res) {
    $("#f-amount").html(value);
    $("#c-amount").html(res);
    celcium_slider.slider('value', res);
  }

  // Render Fahrenheit slider
  function render_fahrenheit_slider(value) {
      fahrenheit_slider.slider({
          range: "min",
          min: 0,
          max: 212,
          value: value,
          slide: function (event, ui) {
            if (_cache.fahrenheit_celsius[ui.value]) {
              update_celcius_slider(ui.value, _cache.fahrenheit_celsius[ui.value]);
            } else {
              $.ajax({
                url:    '/fahrenheit_to_celsius?value=' + ui.value,
                success: function(result) {
                          res = $.parseJSON(result);
                          _cache.fahrenheit_celsius[ui.value] = res.celsius;
                          _cache.celsius_fahrenheit[res.celsius] = ui.value;
                          update_celcius_slider(ui.value, _cache.fahrenheit_celsius[ui.value]);
                        },
                async:   false
              });
            }
          }
      });
  }

  // Update Fahrenheit slider
  function update_fahrenheit_slider(value, res) {
    $("#c-amount").html(value);
    $("#f-amount").html(res);
    fahrenheit_slider.slider('value', res);
  }

  _cache.celsius_fahrenheit = {};
  _cache.fahrenheit_celsius = {};

  var celcium_slider    = $('#c-slider'),
      fahrenheit_slider = $('#f-slider');

  render_celcius_slider(20);
  render_fahrenheit_slider(68);
  $("#c-amount").html(celcium_slider.slider("value"));
  $("#f-amount").html(fahrenheit_slider.slider("value"));

});


