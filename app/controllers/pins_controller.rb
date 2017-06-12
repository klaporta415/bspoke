class PinsController < ApplicationController

  def index
    avoidance = params['avoid']
    Pin.ordered_json(avoidance)
    pins = Pin.ordered_json(avoidance)
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

    @pin = Pin.create(pin_params)

  end

  private
    def pin_params
      params.require(:pin).permit(:latitude, :longitude, :category)
    end
end
