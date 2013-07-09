require 'simplecov'
SimpleCov.start

require './app/convertor_strategy'

describe ConvertorStrategy do
  it "should define inteface process method" do
    ConvertorStrategy.new.should respond_to(:process)
  end

  it "should raise exception on trying to call template method" do
    proc{ ConvertorStrategy.new.process(1) }.should raise_exception(NotImplementedError)
  end

  it "should not be reverse by default" do
    ConvertorStrategy.new.reverse.should be_false
  end

  describe CelsiusToFahrenheitConvertor do
    describe "#process" do
      celsius_fahrenheits = {-10 => 14, 0 => 32, 10 => 50, 15 => 59, 100 => 212}

      context "forward conversion" do
        celsius_fahrenheits.each_pair do |celsius, fahrenheits|
          it "should return #{fahrenheits} fahrenheits for #{celsius} celsius" do
            CelsiusToFahrenheitConvertor.new.process(celsius).should be_eql(fahrenheits.to_f)
          end
        end
      end

      context "reverse conversion" do
        celsius_fahrenheits.each_pair do |celsius, fahrenheits|
          it "should return #{celsius} celsius for #{fahrenheits} fahrenheits" do
            CelsiusToFahrenheitConvertor.new(true).process(fahrenheits).should be_eql(celsius.to_f)
          end
        end
      end
    end
  end


  describe MetersToFeetConvertor do
    describe "#process" do
      meters_feet = {10 => 32.8, 0 => 0, 15 => 49.2, 90 => 295.2}

      context "forward conversion" do
        meters_feet.each_pair do |meters, feet|
          it "should return #{feet} feet for #{meters} meters" do
            MetersToFeetConvertor.new.process(meters).should be_within(0.1).of(feet)
          end
        end
      end

      context "reverse conversion" do
        meters_feet.each_pair do |meters, feet|
          it "should return #{meters} meters for #{feet} feet" do
            MetersToFeetConvertor.new(true).process(feet).should be_within(0.1).of(meters)
          end
        end
      end
    end
  end
end
