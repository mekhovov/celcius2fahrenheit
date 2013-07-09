require './app/convertor_strategy'

# Convertor
class Convertor
  # init
  def initialize(value, convertor)
    raise ArgumentError unless convertor.respond_to?(:process)

    @convertor = convertor
    @value = value
  end

  # rerutn converted value
  def converted_value
    @converted_value ||= @convertor.process(@value)
  end
end
