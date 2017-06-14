class PinWorker
  include Sidekiq::Worker

  def perform(expiration_date)
    # Do something
    p "I've set off the minute timer"
  end
end
