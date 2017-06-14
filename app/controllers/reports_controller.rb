class ReportsController < ApplicationController
  def index
    PinWorker.perform_async("2017-06-14 15:38:46");
    render text: "Request ot generate report"

  end
end
