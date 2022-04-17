require 'fileutils'
require 'json'

class QuesoController < ApplicationController
  @@first_call = true
  DIRECTORY = 'notes'
  SPECIAL_MAPPING_FILE = '.note_map'

  def first_call_check
    if @@first_call
      FileUtils.mkdir_p DIRECTORY
      @@first_call = false 

      mapping_filename = DIRECTORY + "/" + SPECIAL_MAPPING_FILE
      unless File.exist? mapping_filename
        File.open(mapping_filename, 'w') do |file| 
          file.write({}.to_json) 
        end
      end
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

  def all_notes_with_timestamp
    first_call_check

    begin
      note_files = Dir[DIRECTORY + "/*"]
      from_file = JSON.parse(File.read(DIRECTORY + "/" + SPECIAL_MAPPING_FILE))

      final_to_return = {}
      note_files = note_files
        .map{ |nf| nf.gsub!("notes/", "")}
        .each do |nf|
          if from_file[nf]
            final_to_return[nf] = from_file[nf]
          else
            final_to_return[nf] = ''
          end
        end

      some_text = {
        success: true,
        notes: final_to_return.to_json
      }
      render :json => some_text
    rescue Exception => ex
      puts ex
      some_text = {
        success: false,
        notes: {}
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
      # first write the actual file
      File.open(DIRECTORY + "/" + filename, 'w') { 
        |file| file.write(content) 
      }

      # then update our mapping file
      from_file = JSON.parse(File.read(DIRECTORY + "/" + SPECIAL_MAPPING_FILE))
      from_file[filename] = Time.now
      File.open(DIRECTORY + "/" + SPECIAL_MAPPING_FILE, 'w') do |file| 
        file.write(from_file.to_json) 
      end

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
