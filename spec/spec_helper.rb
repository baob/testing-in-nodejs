require 'rubygems'
require 'bundler'
Bundler.require(:default, :development)

# See http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
#
RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  # Many RSpec users commonly either run the entire suite or an individual
  # file, and it's useful to allow more verbose output when running an
  # individual spec file.
  if config.files_to_run.one?
    # Use the documentation formatter for detailed output,
    # unless a formatter has already been configured
    # (e.g. via a command-line flag).
    config.default_formatter = 'doc'
  end

  config.order = :random
  Kernel.srand config.seed
end

Dir.glob(::File.expand_path('../support/*.rb', __FILE__)).each { |f| puts "requiring #{f}" ; require_relative f }
