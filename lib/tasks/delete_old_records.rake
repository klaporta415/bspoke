namespace :delete do
  desc 'Delete records older than 60 days'
  task :old_records => :environment do
    Model.delete_all('created_at < ?', 20.seconds.ago)
    # or Model.delete_all('created_at < ?', 60.days.ago) if you don't need callbacks
  end
end
