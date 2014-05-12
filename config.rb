# Encoding: utf-8
require 'sass'
require 'compass'
require 'bootstrap-sass'
require 'rack_environment'
require 'handlebars_assets'
require 'lib/compass_retina'
require 'lib/random_color'
require 'animation'

##################
# Data
##################
  if File.exist?('./config/environment.yml')
    re = RackEnvironment.new({})
    re.update_environment!
  end


##################
# Flags
##################
  set :css_dir, 'stylesheets'
  set :js_dir, 'javascripts'
  set :images_dir, 'images'
  set :build_dir, 'tmp'
  set :relative_links, true
  set :logging, true


  activate :gzip
  activate :livereload, :port => 35730
  activate :directory_indexes

##################
# Ignores
##################
  ignore %r{javascripts/(mode|app/|main).*$}

##################
# Assets
##################
  Sass::Script::Number.precision = 20
  HandlebarsAssets::Config.path_prefix = 'aura_components'
  after_configuration do  
    # Register Handlebars Templates
    sprockets.append_path HandlebarsAssets.path
    # Register Bower Components
    sprockets.append_path File.join "#{root}", "bower_components"
    # Register Aura Components
    sprockets.append_path 'aura_components'
  end

##################
# Layouts
##################
  # Skip Layout for HBS files
  page "aura_components/*", layout: false
  page "*", :layout => :layout
  page "opensource/*", :layout => :layout
  page "admin/*", :layout => :admin

##################
# Build targets
##################
  configure :build do

    # activate :minify_javascript
    activate :minify_css
    activate :cache_buster
    activate :gzip

    set :logging, true

  end

##################
# Deployment
##################
  activate :s3_sync do |s3_sync|
    s3_sync.bucket                = 'hullstrap3' # The name of the S3 bucket you are targetting. This is globally unique.
    s3_sync.region                = ENV['AWS_REGION']     # The AWS region for your bucket.
    s3_sync.aws_access_key_id     = ENV['AWS_KEY']
    s3_sync.aws_secret_access_key = ENV['AWS_SECRET']
    s3_sync.delete                = false # We delete stray files by default.
    s3_sync.after_build           = false # We chain after the build step by default. This may not be your desired behavior...
    s3_sync.prefer_gzip           = true
  end

  # # Activate sync extension
  # activate :sync do |sync|
  #   sync.fog_provider = 'AWS' # Your storage provider
  #   sync.fog_directory = ENV['AWS_BUCKET'] # Your bucket name
  #   sync.fog_region = ENV['AWS_REGION'] # The region your storage bucket is in (eg us-east-1, us-west-1, eu-west-1, ap-southeast-1 )
  #   sync.aws_access_key_id = ENV['AWS_KEY'] # Your Amazon S3 access key
  #   sync.aws_secret_access_key = ENV['AWS_SECRET'] # Your Amazon S3 access secret
  #   sync.existing_remote_files = 'keep' # What to do with your existing remote files? ( keep or delete )
  #   sync.gzip_compression = true # Automatically replace files with their equivalent gzip compressed version
  #   # sync.after_build = false # Disable sync to run after Middleman build ( defaults to true )
  # end
