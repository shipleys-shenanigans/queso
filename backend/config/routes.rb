Rails.application.routes.draw do
  get 'queso/all_note_names'
  get 'queso/note'
  get 'queso/save'
  root "queso#index"
end
