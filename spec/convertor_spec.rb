require 'simplecov'
SimpleCov.start

require './app/convertor'

describe Convertor do
  describe "#initialization" do
    it "should accept any value and a Strategy object" do
      proc{ Convertor.new(1, ConvertorStrategy.new) }.should_not raise_exception
    end

    it "should not accept an object not able to process value" do
      proc{ Convertor.new(1, "ConvertorStrategy.new") }.should raise_exception(ArgumentError)
    end
  end

  describe "#converted_value" do
    let(:strategy) { double(:strategy, process: "processed_value") }
    let(:convertor) { Convertor.new(1, strategy) }

    it "should calculate a conversion according to the strategy" do
      convertor.converted_value.should be_eql("processed_value")
    end

    it "should use the strategy method" do
      strategy.should_receive(:process)
      convertor.converted_value
    end

    it "should save the value and not calculate it more then once" do
      strategy.should_receive(:process).at_most(:once)
      3.times { convertor.converted_value }
    end
  end
end