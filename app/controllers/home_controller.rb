class HomeController < ApplicationController
  layout  "home_layout", :only => [:index]

  def index

  end

  def report
    PinWorker.perform_async("2017-06-14 15:38:46");
    render plain: "Request to generate report"

  end

end
