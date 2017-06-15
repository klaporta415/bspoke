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
    p pins
    render json: pins
  end

  def new
    @pin = Pin.new
  end

  def create
    p params
    @pin = Pin.create(pin_params)
    if @pin.category == "roadCondition"
    @pin.expiration_date = Time.now + 2.weeks
    elsif @pin.category == "goose"
    @pin.expiration_date = Time.now + 1.day
    else
      @pin.expiration_date = Time.now + 2.days
    end
    # @pin.title = "Pin Title2"
    # @pin.comment = "Pin Comment2"
    @pin.save
  end

  private
    def pin_params
      params.require(:pin).permit(:latitude, :longitude, :category, :expiration_date, :title, :comment)
    end
end
