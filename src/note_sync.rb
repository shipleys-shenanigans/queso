require 'json'

class NoteSync
  DIRECTORY = 'notes'
  SPECIAL_MAPPING_FILE = '.note_map'

  def sync(my_notes, sot_notes)
    my_notes_to_add = []
    my_notes_to_delete = []
    my_notes_to_update = []
    sot_notes_to_update = []

    # if we have, but not in sot, delete
    my_notes.each do |n, timestamp|
      if sot_notes[n]
        if sot_notes[n] < timestamp
          sot_notes_to_update.append([n, timestamp])
        elsif sot_notes[n] > timestamp
          my_notes_to_update.append([n, sot_notes[n]])
        end
      else 
        my_notes_to_delete.append(n)
      end
    end

    # if sot have, but we don't have, add
    sot_notes.each do |n, timestamp|
      my_notes_to_add.append([n, timestamp]) unless my_notes[n]
    end

    puts "Done syncing"
    puts "To delete"
    pp my_notes_to_delete
    puts "To add"
    pp my_notes_to_add
    puts "To sync LOCAL"
    pp my_notes_to_update
    puts "To sync SOT"
    pp sot_notes_to_update
    puts ""

    my_notes_to_delete.each { |n| delete_note_from_local n }
    my_notes_to_add.each { |n, timestamp| add_or_update_note_local(n, timestamp) }
    my_notes_to_update.each { |n, timestamp| add_or_update_note_local(n, timestamp) }
    sot_notes_to_update.each { |n, timestamp| update_file_sot(n, timestamp) }
  end

  def get_file_contents_from_url(filename, url)
    url = URI.parse("#{url}/queso/load?filename=#{ERB::Util.url_encode(filename)}")
      req = Net::HTTP::Get.new(url.to_s)
      res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
      }
      response_body = JSON.parse(res.body) 

      if response_body['success']
        return response_body['content']
      end

      return ''
  end

  def update_file_sot(filename, timestamp)
    content = get_file_contents_from_url(filename, "http://localhost:3000")

    url = URI.parse("https://159.223.158.187:3000/queso/save_with_timestamp?filename=#{ERB::Util.url_encode(filename)}&content=#{ERB::Util.url_encode(content)}&timestamp=#{ERB::Util.url_encode(timestamp)}")
      req = Net::HTTP::Get.new(url.to_s)
      res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
      }
      response_body = JSON.parse(res.body) 

      if response_body['success']
        return response_body['content']
      end

      return ''
  end

  def add_or_update_note_local(filename, timestamp)
    puts "inside"
    puts filename
    puts timestamp

    content = get_file_contents_from_url(filename, "https://159.223.158.187:3000")

    begin
      File.open(DIRECTORY + "/" + filename, 'w') { 
        |file| file.write(content) 
      }

       # then update our mapping file
       from_file = JSON.parse(File.read(DIRECTORY + "/" + SPECIAL_MAPPING_FILE))
       from_file[filename] = timestamp
       File.open(DIRECTORY + "/" + SPECIAL_MAPPING_FILE, 'w') do |file| 
         file.write(from_file.to_json) 
       end

    rescue Exception => ex
      puts ex
    end
  end
  
  def delete_note_from_local(filename)
    begin
      File.open(DIRECTORY + "/" + filename, 'r') do |f|
        File.delete(f)
      end
    rescue Errno::ENOENT
      puts "file already deleted"
    rescue Exception => ex
      puts ex
    end
  end
end