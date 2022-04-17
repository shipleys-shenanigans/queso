Rails.application.routes.draw do
  get 'queso/save'
  root "queso#index"
end
