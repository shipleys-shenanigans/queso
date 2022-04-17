require 'fileutils'

class QuesoController < ApplicationController
  @@first_call = true
  DIRECTORY = 'notes'

  def save
    if @@first_call
      FileUtils.mkdir_p DIRECTORY
      @@first_call = false 
    end

    content = params[:content]
    filename = params[:filename]

    puts "Content"
    puts content
    puts
    puts "Filename"
    puts filename
    puts

    begin
      File.open(DIRECTORY + "/" + filename, 'w') { 
        |file| file.write(content) 
      }
      some_text = {
        success: true,
      }
      render :json => some_text
    rescue Exception => ex
      some_text = {
        success: false,
      }
      render :json => some_text
    end
  end
end
