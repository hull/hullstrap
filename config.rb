require 'bootstrap-sass'
require 'sass-getunicode'
require File.expand_path('../libs/retina.rb', __FILE__)
require File.expand_path('../libs/random-color.rb', __FILE__)

#########################################################################################################
# Sass Configuration
Sass::Script::Number.precision = 20

# Enable Debugging
if environment == :production
  output_style = :compressed
  line_comments = false
else
  output_style = :expanded
  sass_options = { :debug_info => false }
end
