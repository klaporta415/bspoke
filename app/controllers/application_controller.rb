class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  # private

  # def affter_sign_in_path_for(resource)
  #   session["user_return_to"] || home_map_path
  # end

end
