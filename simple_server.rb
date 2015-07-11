#!/usr/bin/env ruby

require 'webrick'

trap("INT"){ exit! };

WEBrick::HTTPServer.new(:DocumentRoot=>".", :Port=>3005).start
