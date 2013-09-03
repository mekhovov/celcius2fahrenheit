function ConvertionSliders(options_forward, options_reverse) {
  this.forward = options_forward;
  this.reverse = options_reverse;
  this.reverse.other = this.forward;
  this.forward.other = this.reverse;

  this.slide = function(opts) {
    self = this;

    return function (event, ui) {
      if (window._cache[opts.cache_container][ui.value]) {
        self.update(ui.value, window._cache[opts.cache_container][ui.value], opts);
      } else {
        $.ajax({
          url:    opts.api_endpoint + '?value=' + ui.value,
          success: function(result) {
                    res = $.parseJSON(result);
                    window._cache[opts.cache_container][ui.value] = res[opts.other.api_field];
                    window._cache[opts.other.cache_container][res[opts.other.api_field]] = ui.value;
                    self.update(ui.value, window._cache[opts.cache_container][ui.value], opts);
                  },
          async: false
        });
      }
    };
  };

  this.forward.slide = this.slide(this.forward);
  this.reverse.slide = this.slide(this.reverse);

  this.render = function() {
    $.each([this.forward, this.reverse], function() {
      window._cache[this.cache_container] = {};

      $(this.slider).slider({
        range: "min",
        min: this.min,
        max: this.max,
        value: this.init_value,
        slide: this.slide
      });
    });
  };

  this.update = function(value, res, options) {
    $(options.amount).html(value);
    $(options.other.amount).html(res);
    $(options.other.slider).slider('value', res);
  };
}