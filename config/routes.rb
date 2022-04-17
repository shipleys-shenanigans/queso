Rails.application.routes.draw do
  get 'queso/save'
  get 'queso/all_notes'
  get 'queso/load'
  root "queso#index"
end
