class PinWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(expiration_date)
    # Do something
    puts "I've set off the minute timer and this is the expiration date #{expiration_date}"
  end
end
