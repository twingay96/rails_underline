class HomeController < ApplicationController
  def index
    @posts = Post.all
    puts "@posts:", @posts
    respond_to do |format|
      format.html
      format.turbo_stream{ render turbo_stream: turbo_stream.replace('task_tabs', partial:'tasks-partial')}
    end
  end
  def create
    puts "Create 동작",params[:content]

    category = Category.find_or_create_by(name: 'Default')
    new_post = category.posts.create(content:params[:content])
    if new_post.valid?
      puts "성공적으로 생성된 내용" , new_post.content
    else
      puts "생성실패:", new_post.errors.full_messages.to_sentence
    end
    
    # redirect_to "/home/index"
    redirect_to root_path

  end

  def new

  end


end
