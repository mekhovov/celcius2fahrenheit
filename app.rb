
require 'sinatra'
require 'json'

# application
require './app/convertor'

# Index page
get '/' do
  erb :about
end

# Convert Celsius to Fahrenheit
get '/celsius_to_fahrenheit' do
  fahrenheit = Convertor.new(params[:value].to_f, CelsiusToFahrenheitConvertor.new)
  { :celsius => params[:value].to_f,
    :fahrenheit => fahrenheit.converted_value.round(2)
  }.to_json
end

# Convert Fahrenheit to Celsius
get '/fahrenheit_to_celsius' do
  celsius = Convertor.new(params[:value].to_f, CelsiusToFahrenheitConvertor.new(true))
  { :celsius => celsius.converted_value.round(2),
    :fahrenheit => params[:value].to_f
  }.to_json
end

