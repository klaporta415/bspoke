class PinsController < ApplicationController

  def index
    Pin.ordered_json
    pins = Pin.ordered_json
    render json: pins
  end

  # def pin_index
  #   Pin.ordered_json
  #   pins = Pin.ordered_json
  # end


  def new
    @pin = Pin.new
  end

  def create
    p params
    @pin = Pin.new(pin_params)
    if @pin.category == "on"
      @pin.category = "general"
    end
    @pin.save
  end

  private
    def pin_params
      params.require(:pin).permit(:latitude, :longitude, :category)
    end
end
