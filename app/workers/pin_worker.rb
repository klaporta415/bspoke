class PinWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform()
    # Do something
    # sleep 20
    Pin.where('expiration_date < ?', Time.now).each do |pin|
      pin.destroy
    end

  end
end
