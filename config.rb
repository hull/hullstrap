###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end
# 

set :css_dir, 'stylesheets'
set :sass_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :build_dir, 'tmp'

compass_config do |config|
  config.fonts_path = "stylesheets"
end

activate :livereload

page "*", :layout => :layout
page "opensource/*", :layout => :layout
page "admin/*", :layout => :admin

require 'lib/retina.rb'
require 'lib/random-color.rb'
Sass::Script::Number.precision = 20

# Build-specific configuration
configure :build do

  activate :minify_css
  activate :minify_javascript
  activate :cache_buster
  activate :gzip

  set :logging, true
end

require 'rack_environment'

if File.exist?('./config/environment.yml')
  re = RackEnvironment.new({})
  re.update_environment!
end


activate :s3_sync do |s3_sync|
  s3_sync.bucket                = ENV['AWS_BUCKET'] # The name of the S3 bucket you are targetting. This is globally unique.
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
