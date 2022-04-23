require 'fileutils'
require 'json'
require 'ostruct'

class QuesoController < ApplicationController
  def all_note_names
    begin
      notes = Note.pluck(:filename, :id).map{ |nobj| { filename: nobj[0], id: nobj[1] } }
      some_text = {
        success: true,
        notes: notes
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

  def note
    id = params[:id]
    begin
      some_text = {
        success: true,
        note: Note.where(:id => id).limit(1).as_json,
      }
      render :json => some_text
    rescue Exception => ex
      puts ex
      some_text = {
        success: false,
        note: "",
      }
      render :json => some_text
    end
  end

  def save
    content = params[:content]
    filename = params[:filename]

    begin
      if Note.where(:filename => filename).present?
        note = Note.where(:filename => filename).limit(1)[0]
        note.update(content: content)
      else
        new_note = Note.new(filename: filename, content: content)
        new_note.save
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
