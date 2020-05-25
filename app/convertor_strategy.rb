# Strategy
class ConvertorStrategy
  # reverse value
  attr_reader :reverse

  # init
  def initialize(reverse=false)
    @reverse = reverse
  end

  # process value using Strategy
  def process(value)
    raise NotImplementedError
  end
end

# From Celsius To Fahrenheit Convertor
class CelsiusToFahrenheitConvertor < ConvertorStrategy
  # convert from Celsius To Fahrenheit
  def process(value)
    return reverse_process(value) if reverse

    1.8 * value + 32
  end

  # convert from Fahrenheit To Celsius
  def reverse_process(value)
    (value - 32) / 1.8
  end
end

# Meters To Feet (just for example)
class MetersToFeetConvertor < ConvertorStrategy
  # convert from Meters To Feet
  def process(value)
    return reverse_process(value) if reverse

    3.28 * value
  end

  # convert from Feet To Meters
  def reverse_process(value)
    value / 3.28
  end
end

# Bank Coding to Regex
class BankCodingToRegexConvertor < ConvertorStrategy
  TRANSFORMS = {
    'n' => '\d',
    'a' => '[A-Z]',
    'c' => '[a-zA-Z0-9]',
    'e' => '\s'
  }
  def process(registry)
    begin
      regex = registry.gsub(/\A[A-Z]{2}/,'\A[A-Z]{2}').   #country code
            gsub(/(\d+)!([nace])/, '\2{\1}').   #fixed length(nn!)
            gsub(/(\d+)([nace])/, '\2{1,\1}').  #maximum length(nn)
            gsub(/[nace]/, TRANSFORMS)
    rescue
      return "Beer!"
    end
    return "/#{regex}/"
  end
end