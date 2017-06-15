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
    if @pin.category == "event"
    @pin.expiration_date = Time.now + 10
    elsif @pin.category == "general"
    @pin.expiration_date = Time.now + 20
    elsif @pin.category == "smell"
      @pin.expiration_date = Time.now + 30
    elsif @pin.category == "goose"
      @pin.expiration_date = Time.now + 40
    else
      @pin.expiration_date = Time.now + 50
    end
    @pin.save
  end

  private
    def pin_params
      params.require(:pin).permit(:latitude, :longitude, :category, :expiration_date)
    end
end
