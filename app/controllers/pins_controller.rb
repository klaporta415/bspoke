class PinsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    avoidance = params['avoid']
    pins = Pin.ordered_json(avoidance)
    p pins
    render json: pins
  end

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
