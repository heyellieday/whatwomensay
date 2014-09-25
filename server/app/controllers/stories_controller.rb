class StoriesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
  	params.permit(:callback)
  	if params[:callback]
  		respond_to do |format|
  			#format.html { render json: {stories: Story.all}}
	  		format.js { render json: {stories: Story.all}, :callback => params[:callback] }
	  	end
	else
		render json: {stories: Story.all}
	end
  end

  def create
  	params.permit(:title, :text)
  	Story.create(title:params[:title], text: params[:text])
  end
end
