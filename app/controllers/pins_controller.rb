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
    @pin = Pin.create(pin_params)
  end

  private
    def pin_params
      params.require(:pin).permit(:latitude, :longitude)
    end
end
