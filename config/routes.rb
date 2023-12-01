Rails.application.routes.draw do
  root 'home#index'
  get 'home/index' => "home#index"
  post 'home/create' =>"home#create"

  # 정적파일전달용 라우트
  get 'home/under_line.css' => 'home#under_line'
  
end
