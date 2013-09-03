$(function () {
  new ConvertionSliders({
      min: 0,
      max: 97,
      init_value: 52,
      slider: '#m-slider',
      amount: '#m-amount',
      cache_container: 'meters_feet',
      api_endpoint: '/meters_to_feet',
      api_field: 'meters'
    }, {
      min: 0,
      max: 320,
      init_value: 171,
      slider: '#ft-slider',
      amount: '#ft-amount',
      cache_container: 'feet_meters',
      api_endpoint: '/feet_to_meters',
      api_field: 'feet'
    }
  ).render();
});

