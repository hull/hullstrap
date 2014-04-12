module HullHelpers
  def icon_list
    return @icons unless @icons.nil?
    icon_list = Dir.entries(File.dirname(__FILE__) + '/../source/images/icons')
    @icons ||= icon_list.map {|i| i.gsub('.svg','')}
  end
end
