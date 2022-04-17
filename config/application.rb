require_relative "boot"

require "rails/all"
require 'rufus-scheduler'
require 'open-uri'
require 'net/http'
require 'json'
require './src/note_sync'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module YourProject
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.is_sot = true

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # config.active_job.queue_adapter = :sidekiq
    # SyncJob.new.perform('bob', 5)

    unless config.is_sot
      scheduler = Rufus::Scheduler.new
      scheduler.every '10s' do
        sot_notes = self.get_notes_from_url "https://159.223.158.187:3000"
        my_notes = self.get_notes_from_url "http://localhost:3000"
        NoteSync.new.sync(my_notes, sot_notes)
      end

      def get_notes_from_url(url)
        url = URI.parse("#{url}/queso/all_notes_with_timestamp")
        req = Net::HTTP::Get.new(url.to_s)
        res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
        }

        response_body = JSON.parse(res.body) 

        if response_body['success'] == true
          return JSON.parse(response_body['notes'])
        end

        {}
      end
    end
  end
end
