require 'spec_helper'

describe 'ack.js', type: :aruba  do

  describe 'when run with -d1 -q=.js' do
    it 'runs' do
      run_simple "ack.js -d=1 -q=.js"
    end
  end

end
