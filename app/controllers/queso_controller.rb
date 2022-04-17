require 'fileutils'

class QuesoController < ApplicationController
  @@first_call = true
  DIRECTORY = 'notes'

  def first_call_check
    if @@first_call
      FileUtils.mkdir_p DIRECTORY
      @@first_call = false 
    end
  end

  def all_notes
    first_call_check

    begin
      note_files = Dir[DIRECTORY + "/*"]
      note_files = note_files.map{ |nf| nf.gsub!("notes/", "")}
      some_text = {
        success: true,
        notes: note_files
      }
      render :json => some_text
    rescue Exception => ex
      puts ex
      some_text = {
        success: false,
        notes: []
      }
      render :json => some_text
    end
  end

  def load
    first_call_check

    filename = params[:filename]

    begin
      content = File.read(DIRECTORY + "/" + filename)
      some_text = {
        success: true,
        content: content,
      }
      render :json => some_text
    rescue Exception => ex
      puts ex
      some_text = {
        success: false,
        content: "",
      }
      render :json => some_text
    end
  end

  def save
    first_call_check

    content = params[:content]
    filename = params[:filename]

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
