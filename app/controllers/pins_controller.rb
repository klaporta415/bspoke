class PinsController < ApplicationController

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
