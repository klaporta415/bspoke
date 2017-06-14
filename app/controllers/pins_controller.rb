class PinsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    if params['avoid'] != nil

     avoidance = params['avoid']

     capturegroup = avoidance.scan(/avoid=(\w+)/).flatten
    # p capturegroup
   else
    capturegroup = ["everything"]
   end
    pins = Pin.ordered_json(capturegroup)
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
