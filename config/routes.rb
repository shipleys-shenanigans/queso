Rails.application.routes.draw do
  get 'queso/save'
  get 'queso/all_notes'
  get 'queso/all_notes_with_timestamp'
  get 'queso/load'
  root "queso#index"
end
