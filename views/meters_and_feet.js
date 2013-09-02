$(function () {

  // Render Meters slider
  function render_meters_slider(value) {
      $('#m-slider').slider({
          range: "min",
          min: 0,
          max: 97,
          value: value,
          slide: function (event, ui) {
            if (_cache.meters_feet[ui.value]) {
              update_feet_slider(ui.value, _cache.meters_feet[ui.value]);
            } else {
              $.ajax({
                url:    '/meters_to_feet?value=' + ui.value,
                success: function(result) {
                          res = $.parseJSON(result);
                          _cache.meters_feet[ui.value] = res.feet;
                          _cache.feet_meters[res.feet] = ui.value;
                          update_feet_slider(ui.value, _cache.meters_feet[ui.value]);
                        },
                async:   false
              });
            }
          }
      });
  }

  // Update Meters slider
  function update_meters_slider(value, res) {
    $("#m-amount").html(value);
    $("#ft-amount").html(res);
    meters_slider.slider('value', res);
  }

  // Render Feet slider
  function render_feet_slider(value) {
      $('#ft-slider').slider({
          range: "min",
          min: 0,
          max: 320,
          value: value,
          slide: function (event, ui) {
            if (_cache.feet_meters[ui.value]) {
              update_meters_slider(ui.value, _cache.feet_meters[ui.value]);
            } else {
              $.ajax({
                url:    '/feet_to_meters?value=' + ui.value,
                success: function(result) {
                          res = $.parseJSON(result);
                          _cache.feet_meters[ui.value] = res.meters;
                          _cache.meters_feet[res.feet] = ui.value;
                          update_meters_slider(ui.value, _cache.feet_meters[ui.value]);
                        },
                async:   false
              });
            }
          }
      });
  }

  // Update Feet slider
  function update_feet_slider(value, res) {
    $("#m-amount").html(value);
    $("#ft-amount").html(res);
    feet_slider.slider('value', res);
  }

  _cache.meters_feet = {};
  _cache.feet_meters = {};

  var meters_slider = $('#m-slider'),
      feet_slider   = $('#ft-slider');

  render_meters_slider(52);
  render_feet_slider(171);
  $("#m-amount").html(meters_slider.slider("value"));
  $("#ft-amount").html(feet_slider.slider("value"));

});


