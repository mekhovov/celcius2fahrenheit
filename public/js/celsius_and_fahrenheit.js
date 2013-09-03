$(function () {
  new ConvertionSliders({
      min: -18,
      max: 100,
      init_value: 20,
      slider: '#c-slider',
      amount: '#c-amount',
      cache_container: 'celsius_fahrenheit',
      api_endpoint: '/celsius_to_fahrenheit',
      api_field: 'celsius'
    }, {
      min: 0,
      max: 212,
      init_value: 68,
      slider: '#f-slider',
      amount: '#f-amount',
      cache_container: 'fahrenheit_celsius',
      api_endpoint: '/fahrenheit_to_celsius',
      api_field: 'fahrenheit'
    }
  ).render();
});


